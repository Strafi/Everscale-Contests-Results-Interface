import { TonClient } from '@tonclient/core';
import { libWeb } from '@tonclient/lib-web';

import contestAbi from 'contest.abi';

class TonApi {
	constructor() {
		this.bocCache = new Map();
	}

	init() {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		TonClient.useBinaryLibrary(libWeb);

		this.client = new TonClient({
			network: {
				server_address: 'main.ton.dev',
			},
		});

		this.client.crypto.generate_random_sign_keys()
			.then(keys => this.keys = keys);
	}

	async getContestSubmissions(contestAddress) {
		if (!contestAddress)
			return;

		try {
			const contendersInfo = await this.runContestFunction(contestAddress, 'getContendersInfo');

			const submissions = contendersInfo.ids.map((id, index) => {
				const createdAtTimestamp = parseInt(contendersInfo.appliedAts[index].substr(0, 10), 10);
				const createdAtDate = new Date(createdAtTimestamp * 1000);
				console.log(contendersInfo)

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

			const submissionsWithStats = Promise.all(
				submissions.map(subm => this.getSubmissionWithStats(contestAddress, subm))
			);

			return submissionsWithStats;
		} catch(err) {
			console.error('Getting contest submissions failed: ', err);
		}
	}

	async getSubmissionWithStats(contestAddress, submmission) {
		if (!contestAddress)
			return;

		const votesPerJuror = await this.runContestFunction(
			contestAddress,
			'getVotesPerJuror',
			{ id: submmission.id },
		);

		const sumbStats = {
			marks: votesPerJuror.marks,
			abstainAmount: votesPerJuror.jurorsAbstained.length,
			rejectAmount: votesPerJuror.jurorsAgainst.length,
		};

		return {
			...submmission,
			...sumbStats,
		};
	}

	async getContestInfo(contestAddress) {
		try {
			const infoAndProgress = await Promise.all([
				this.runContestFunction(contestAddress, 'getContestInfo'),
				this.runContestFunction(contestAddress, 'getContestProgress'),
			]);
			const [contestInfo, contestProgress] = infoAndProgress;
	
			return {
				...contestInfo,
				...contestProgress,
			};
		} catch(err) {
			console.error('Getting full contest info failed:', err);
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