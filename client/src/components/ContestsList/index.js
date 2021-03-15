import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatabaseApi, TonApi } from 'src/api';
import { setBulkContestsInfo } from 'src/store/actions/contest';
import { Loader } from 'src/components'; 
import ContestListItem from './ListItem';
import SubgovSwitcher from './SubgovSwitcher';
import './index.scss';

class ContestsList extends Component {
	state = {
		governances: [],
		isLoaderVisible: false,
	}

	async componentDidMount() {
		try {
			const { contestsInfo } = this.props;

			if (!contestsInfo.length)
				this.setState({ isLoaderVisible: true });

			await this.fetchGovernances();
			await this.fetchContests();

			this.setState({ isLoaderVisible: false });
		} catch(err) {
			console.error('Fetching contests failed: ', err);

			setTimeout(async () => {
				await this.fetchGovernances();
				await this.fetchContests();
				this.setState({ isLoaderVisible: false });
			}, 5000);
		}
	}

	async componentDidUpdate(prevProps) {
		try {
			if (prevProps.selectedGovernance.name !== this.props.selectedGovernance.name) {
				this.setState({ isLoaderVisible: true });
				await this.fetchContests();
				this.setState({ isLoaderVisible: false });
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
		const { setBulkContestsInfo, selectedGovernance } = this.props;

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

	render() {
		const { contestsInfo, selectedGovernance } = this.props;
		const { governances, isLoaderVisible } = this.state;

		return (
			<div className='contests-list'>
				<SubgovSwitcher
					governances={governances}
					selectedGovernance={selectedGovernance}
				/>
				{isLoaderVisible
					? <Loader />
					: contestsInfo?.length
						? this.renderContestItems()
						: <Loader isFailed />
				}
			</div>
		);
	}
}

const mapStateToProps = ({ contest, common }) => {
	const { contestsInfo } = contest;
	const { selectedGovernance } = common;

	return {
		contestsInfo: Object.values(contestsInfo),
		selectedGovernance,
	}
};

export default connect(mapStateToProps, {
	setBulkContestsInfo,
})(ContestsList);
