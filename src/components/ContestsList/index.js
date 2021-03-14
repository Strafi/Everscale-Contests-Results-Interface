import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatabaseApi, TonApi } from 'src/api';
import { setBulkContestsInfo } from 'src/store/actions/contest';
import { DEFAULT_GOVERNANCE } from 'src/constants';
import ContestListItem from './ListItem';
import SubgovSwitcher from './SubgovSwitcher';
import './index.scss';

class ContestsList extends Component {
	state = {
		governances: [],
		selectedGovernance: {
			name: DEFAULT_GOVERNANCE.NAME,
			fullName: DEFAULT_GOVERNANCE.FULL_NAME,
		},
	}

	componentDidMount() {
		try {
			this.fetchContests();
			this.fetchGovernances();
		} catch(err) {
			console.error('Fetching contests failed: ', err);

			setTimeout(this.fetchContests, 5000);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		try {
			if (prevState.selectedGovernance.name !== this.state.selectedGovernance.name) {
				this.fetchContests();
			}
		} catch(err) {
			console.error('Fetching contests failed: ', err);

			setTimeout(this.fetchContests, 5000);
		}
	}

	fetchGovernances = async () => {
		const governances = await DatabaseApi.getGovernances();

		this.setState({ governances });
	}

	fetchContests = async () => {
		const { setBulkContestsInfo } = this.props;
		const { selectedGovernance } = this.state;
	
		const contestsFromDB = await DatabaseApi.getContests({ governance: selectedGovernance.name });
		const contestsWithFullInfo = await Promise.all(
			contestsFromDB.items.map(contest => this.getContestFullInfo(contest))
		);

		setBulkContestsInfo(contestsWithFullInfo);
	}

	getContestFullInfo = async contestFromDB => {
		const { address, governance, ...rest } = contestFromDB.fields;
		const contestInfoFromBlockchain = await TonApi.getContestInfo(address);

		return {
			...contestInfoFromBlockchain,
			...rest,
			address,
			governance: governance.fields.name,
		}
	}

	renderContestItems = () => {
		const { contestsInfo } = this.props;
		const contestItems = contestsInfo.map((contest, index) => (
			<ContestListItem
				isGrey={index % 2 === 0 || index === 0}
				contest={contest}
				key={contest.address}
			/>
		));

		return contestItems;
	}

	selectGovernance = newSelectedGovernance => {
		this.setState({ selectedGovernance: newSelectedGovernance })
	}

	render() {
		const { contestsInfo } = this.props;
		const { selectedGovernance, governances } = this.state;

		return (
			<div className='contests-list'>
				<SubgovSwitcher
					governances={governances}
					selectedGovernance={selectedGovernance}
					selectGovernance={this.selectGovernance}
				/>
				{contestsInfo.length ? this.renderContestItems() : <div>Loading...</div>}
			</div>
		);
	}
}

const mapStateToProps = ({ contest }) => {
	const { contestsInfo } = contest;

	return { contestsInfo: Object.values(contestsInfo) }
};

export default connect(mapStateToProps, {
	setBulkContestsInfo,
})(ContestsList);
