import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatabaseApi, TonApi } from 'src/api';
import { setBulkContestsInfo } from 'src/store/actions/contest';
import ContestListItem from './ListItem';
import './index.scss';

class ContestsList extends Component {
	state = {
		contests: []
	}

	componentDidMount() {
		try {
			this.fetchContests();
		} catch(err) {
			console.error('Fetching contests failed: ', err);

			setTimeout(this.fetchContests, 5000);
		}
	}

	fetchContests = async () => {
		const { setBulkContestsInfo } = this.props;
	
		const contestsFromDB = await DatabaseApi.getContests();
		const contestsWithFullInfo = await Promise.all(
			contestsFromDB.items.map(contest => this.getContestFullInfo(contest))
		);

		setBulkContestsInfo(contestsWithFullInfo);
	}

	getContestFullInfo = async contestFromDB => {
		const { address, government, rewards } = contestFromDB.fields;
		const contestInfoFromBlockchain = await TonApi.getContestInfo(address);

		return {
			...contestInfoFromBlockchain,
			address,
			government,
			rewards,
		}
	}

	renderContestItems = () => {
		const { contestsInfo } = this.props;
		let contestItems = [];

		for (const [, contest] of contestsInfo) {
			contestItems.push(<ContestListItem contest={contest} key={contest.address} />);
		}

		return contestItems;
	}

	render() {
		const { contestsInfo } = this.props;

		if (!contestsInfo.size)
			return (<div>Loading...</div>);

		return (
			<div className='contests-list'>
				{this.renderContestItems()}
			</div>
		);
	}
}

const mapStateToProps = ({ contest }) => {
	const { contestsInfo } = contest;

	return { contestsInfo }
};

export default connect(mapStateToProps, {
	setBulkContestsInfo,
})(ContestsList);
