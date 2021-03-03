/* eslint-disable camelcase */
import React, { Component } from 'react';

import { DatabaseApi, TonApi } from 'api';
import ContestListItem from './ListItem';

import './index.scss';

class ContestsList extends Component {
	state = {
		contests: []
	}

	async componentDidMount() {
		const contestsFromDB = await DatabaseApi.getContests();
		const contestsWithFullInfo = await Promise.all(
			contestsFromDB.items.map(contest => this.getContestFullInfo(contest))
		);

		this.setState({
			contests: contestsWithFullInfo,
		})
	}

	getContestFullInfo = async contestFromDB => {
		try {
			const { address, government } = contestFromDB.fields;
			const contestInfoFromBlockchain = await TonApi.getContestInfo(address);
			
			const link = Buffer.from(contestInfoFromBlockchain.link, 'hex').toString();
			const title = Buffer.from(contestInfoFromBlockchain.title, 'hex').toString();

			return {
				...contestInfoFromBlockchain,
				address,
				government,
				link,
				title,
			}
		} catch(err) {
			console.error(err);

			return {
				...contestFromDB.fields,
			}
		}
	}

	renderContestItems = () => {
		const { contests } = this.state;

		const contestItems = contests.map(contest => (
			<ContestListItem contest={contest} />
		))

		return contestItems;
	}

	render() {
		const { contests } = this.state;
		console.log(contests)
		return (
			<div className='contests-list'>
				{this.renderContestItems()}
			</div>
		);
	}
}

export default ContestsList;
