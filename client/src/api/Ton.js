import store from 'src/store';
import { TonClient } from '@tonclient/core';
import { libWeb } from '@tonclient/lib-web';

import contestAbi from 'src/contest.abi';

class TonApi {
	constructor() {
		this.bocCache = new Map();
		this.votesPerJurorCache = {};
	}

	init() {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		TonClient.useBinaryLibrary(libWeb);

		this.client = new TonClient({
			network: {
				server_address: 'main.ton.dev',
			},
		});
	}

	async getContestSubmissionsAndJurors(contestAddress, useCache = false) {
		if (!contestAddress)
			return;

		try {
			const contendersInfo = await this.runContestFunction(contestAddress, 'getContendersInfo');

			const submissions = contendersInfo.ids.map((id, index) => {
				const createdAtTimestamp = parseInt(contendersInfo.appliedAts[index].substr(0, 10), 10);
				const createdAtDate = new Date(createdAtTimestamp * 1000);

				return {
					id: parseInt(id, 10),
					title: `Submission ${parseInt(id, 10)}`,
					participantAddress: contendersInfo.addrs[index],
					discussionLink: Buffer.from(contendersInfo.forumLinks[index], 'hex').toString(),
					fileLink: Buffer.from(contendersInfo.fileLinks[index], 'hex').toString(),
					hash: contendersInfo.hashes[index],
					createdAt: createdAtDate,
					createdAtTimestamp,
					contactAddress: contendersInfo.contacts[index],
				};
			});

			const juryStats = {};
			const submissionsWithStats = await Promise.all(
				submissions.map(async subm => { 
					const { removedJurors } = store.getState().contest;
					const removedJurorsForContest = removedJurors[contestAddress] || [];
					const votesPerJuror = await this.getVotesPerJurorForSubmission(contestAddress, subm.id, useCache);
					const {
						jurorsFor,
						jurorsAbstained,
						jurorsAgainst,
						marks,
					} = votesPerJuror;

					const jurorsForArr = [];
					const marksObj = marks.reduce((acc, mark, index) => {
						const juryAddr = jurorsFor[index];

						if (removedJurorsForContest.includes(juryAddr))
							return acc;

						jurorsForArr.push(juryAddr);

						return [...acc, { mark, juryAddr }];
					}, []);

					const jurorsAbstainedArr = jurorsAbstained.filter(jury => !removedJurorsForContest.includes(jury));
					const jurorsRejectArr = jurorsAgainst.filter(jury => !removedJurorsForContest.includes(jury));

					const sumbStats = {
						marks: marksObj,
						jurorsAbstained: jurorsAbstainedArr,
						jurorsReject: jurorsRejectArr,
						abstainAmount: jurorsAbstainedArr.length,
						rejectAmount: jurorsRejectArr.length,
					};

					function updateJurorsStatFromCollection(collection, stat) {
						collection.forEach((address) => {
							if (juryStats[address]) {
								juryStats[address][stat] = (juryStats[address][stat] || 0) + 1;
							} else {
								juryStats[address] = {
									[stat]: 1,
								}
							}
						})
					}

					updateJurorsStatFromCollection(jurorsForArr, 'acceptAmount');
					updateJurorsStatFromCollection(jurorsAbstainedArr, 'abstainAmount');
					updateJurorsStatFromCollection(jurorsRejectArr, 'rejectAmount');

					return {
						...subm,
						...sumbStats,
					}
				})
			);

			let counter = 1;
			for (const address in juryStats) {
				juryStats[address].id = counter;
				counter++;
			}

			return { submissionsWithStats, juryStats };
		} catch(err) {
			console.error('Getting contest submissions failed: ', err);

			return { submissionsWithStats: [], juryStats: {} };
		}
	}

	async getVotesPerJurorForSubmission(contestAddress, submId, useCache) {
		if (!contestAddress || !submId)
			return;
		
		if (useCache && this.votesPerJurorCache[contestAddress]?.has(submId))
			return this.votesPerJurorCache[contestAddress].get(submId);

		const votesPerJuror = await this.runContestFunction(
			contestAddress,
			'getVotesPerJuror',
			{ id: submId },
		);

		if (this.votesPerJurorCache[contestAddress]) {
			this.votesPerJurorCache[contestAddress].set(submId, votesPerJuror);
		} else {
			this.votesPerJurorCache[contestAddress] = new Map([[submId, votesPerJuror]]);
		}

		return votesPerJuror;
	}

	async getContestInfo(contestAddress) {
		try {
			const infoAndProgress = await Promise.all([
				this.runContestFunction(contestAddress, 'getContestInfo'),
				this.runContestFunction(contestAddress, 'getContestProgress'),
			]);
			const [contestInfo, contestProgress] = infoAndProgress;

			const link = Buffer.from(contestInfo.link, 'hex').toString();
			const title = Buffer.from(contestInfo.title, 'hex').toString();
	
			return {
				...contestInfo,
				...contestProgress,
				link,
				title,
			};
		} catch(err) {
			console.error('Getting full contest info failed:', err);
		}
	}

	async isAddressValid(address) {
		try {
			const result = await this.client.utils.convert_address({
				address,
				output_format: {
					type: 'Hex',
				}
			})

			return !!result;
		} catch (err) {
			return false;
		}
	}

	async runContestFunction(contestAddress, functionName, functionInput) {
		try {
			let boc;

			if (this.bocCache.has(contestAddress)) {
				boc = this.bocCache.get(contestAddress);
			} else {
				const params = {
					collection: 'accounts',
					filter: {
						id: {
							eq: contestAddress,
						},
					},
					result: 'id, boc',
				};
		
				const res = await this.client.net.wait_for_collection(params);
	
				boc = res.result.boc;
				this.bocCache.set(contestAddress, boc);
			}

			const apiMessageParams = {
				abi: {
					type: 'Contract',
					value: contestAbi,
				},
				address: contestAddress,
				call_set: {
					function_name: functionName,
				},
				signer: {
					type: 'None',
				},
			}

			if (functionInput)
				apiMessageParams.call_set.input = functionInput;
	
			const abiMessage = await this.client.abi.encode_message(apiMessageParams);
	
			const contestFunctionRes = await this.client.tvm.run_tvm({
				message: abiMessage.message,
				account: boc,
				abi: {
					type: 'Contract',
					value: contestAbi,
				},
			});
	
			return contestFunctionRes.decoded?.output;
		} catch(err) {
			console.error(`Contest function ${functionName} executeion failed: `, err);
		}
	}
}

const tonApi = new TonApi();

export default tonApi;