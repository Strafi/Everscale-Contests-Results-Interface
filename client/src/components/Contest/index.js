import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TonApi, DatabaseApi } from 'src/api';
import { exportToExcel, processSubmissionsInfo, sortSubmissions, sortJury } from 'src/helpers';
import { setContestInfo, setSubmissionsInfo, setJuryInfo } from 'src/store/actions/contest';
import { SORT_BY_VALUES_PARTICIPANTS, SORT_BY_VALUES_JURY } from 'src/constants';
import { Loader } from 'src/components';
import ContestHeader from './ContestHeader';
import ContestTableHeader from './ContestTableHeader';
import ContestTableBody from './ContestTableBody';
import './index.scss';

const defaultSubmissionsSortParams = {
	field: SORT_BY_VALUES_PARTICIPANTS.DEFAULT,
	isAskending: true,
}

const defaultJurySortParams = {
	field: SORT_BY_VALUES_JURY.DEFAULT,
	isAskending: true,
}

class Contest extends Component {
	state = {
		isJuryView: false,
		isCountRejectAsZero: false,
		juryRewardPercent: undefined,
		submissionsSortParams: defaultSubmissionsSortParams,
		jurySortParams: defaultJurySortParams,
	}

	componentDidMount() {
		try {
			this.fetchSubmissionsInfo();
		} catch(err) {
			console.error('Fetching submissions failed: ', err);

			setTimeout(this.fetchSubmissionsInfo, 5000);
		}
	}

	componentDidUpdate(prevProps) {
		try {
			const { addressFromUrl, removedJurorsForContest } = this.props;

			if (prevProps.addressFromUrl !== addressFromUrl) {
				this.setJuryView(false);
				this.setState({
					isJuryView: false,
					juryRewardPercent: undefined,
					submissionsSortParams: defaultSubmissionsSortParams,
					jurySortParams: defaultJurySortParams,
				});
				this.fetchSubmissionsInfo();
			} else if (prevProps.removedJurorsForContest !== removedJurorsForContest) {
				this.fetchSubmissionsInfo(true) //useCache = true;
			}
		} catch(err) {
			console.error('Fetching submissions failed: ', err);

			setTimeout(this.fetchSubmissionsInfo, 5000);
		}
	}

	fetchSubmissionsInfo = async (useCache = false) => {
		const {
			addressFromUrl,
			contestInfo: contestInfoFromRedux,
			setContestInfo,
			setSubmissionsInfo,
			setJuryInfo,
			history
		} = this.props;
		const { jurySortParams, isCountRejectAsZero } = this.state;

		const isValidAddress = await TonApi.isAddressValid(addressFromUrl);

		if (!isValidAddress)
			return history.push('/');

		let fullContestInfo = contestInfoFromRedux;

		if (!fullContestInfo) {
			fullContestInfo = await this.getContestFullInfo(addressFromUrl);

			setContestInfo(fullContestInfo);
		}

		if (fullContestInfo.juryRewardPercent)
			this.setJuryRewardPercent(fullContestInfo.juryRewardPercent);

		const { submissionsWithStats, juryStats } = await TonApi.getContestSubmissionsAndJurors(addressFromUrl, useCache);
		const processedSubmissions = processSubmissionsInfo(submissionsWithStats, fullContestInfo.rewards, { isCountRejectAsZero });
		const sortedJury = sortJury(juryStats, jurySortParams.field, jurySortParams.isAskending);

		setSubmissionsInfo(addressFromUrl, processedSubmissions);
		setJuryInfo(addressFromUrl, sortedJury);
	}

	getContestFullInfo = async address => {
		const [contestInfoFromBlockchain, contestInfoFromDB] = await Promise.all([
			TonApi.getContestInfo(address),
			DatabaseApi.getContestByAddress(address)
		]);
		const { governance } = contestInfoFromDB;

		return {
			...contestInfoFromBlockchain,
			...contestInfoFromDB,
			address,
			governance,
		}
	}

	exportExcel = async () => {
		const { contestInfo, contestSubmissions, contestJury } = this.props;
		const { juryRewardPercent } = this.state;

		try {
			await exportToExcel(contestInfo, contestSubmissions, contestJury, juryRewardPercent);
		} catch(err) {
			console.error('Table export failed: ', err);
		}
	}

	setJuryView = isJuryView => {
		this.setState({ isJuryView });
	}

	setJuryRewardPercent = rewardPercent => {
		this.setState({ juryRewardPercent: rewardPercent });
	}

	setIsCountRejectAsZero = isCountRejectAsZero => {
		const { addressFromUrl, contestSubmissions, contestInfo, setSubmissionsInfo } = this.props;

		this.setState({ isCountRejectAsZero });

		const processedSubmissions = processSubmissionsInfo(contestSubmissions, contestInfo.rewards, { isCountRejectAsZero });

		setSubmissionsInfo(addressFromUrl, processedSubmissions);
	}

	sortJury = newSortField => {
		const { contestJury, setJuryInfo, addressFromUrl } = this.props;
		const { field, isAskending } = this.state.jurySortParams;
		const isAskendingChange = newSortField === field;

		const newSortParams = {
			field: newSortField,
			isAskending: isAskendingChange ? !isAskending : isAskending,
		}

		const sortedJury = sortJury(
			contestJury,
			newSortParams.field,
			newSortParams.isAskending
		);

		setJuryInfo(addressFromUrl, sortedJury);
		this.setState({ jurySortParams: newSortParams });
	}

	sortSubmissions = newSortField => {
		const { contestSubmissions, setSubmissionsInfo, addressFromUrl } = this.props;
		const { field, isAskending } = this.state.submissionsSortParams;
		const isAskendingChange = newSortField === field;

		const newSortParams = {
			field: newSortField,
			isAskending: isAskendingChange ? !isAskending : isAskending,
		}

		const sortedSubmissions = sortSubmissions(
			contestSubmissions,
			newSortParams.field,
			newSortParams.isAskending
		);

		setSubmissionsInfo(addressFromUrl, sortedSubmissions);
		this.setState({ submissionsSortParams: newSortParams });
	}

	render() {
		const { contestSubmissions, contestInfo, contestJury, addressFromUrl } = this.props;
		const { isJuryView, juryRewardPercent, submissionsSortParams, jurySortParams, isCountRejectAsZero } = this.state;
		const hasSubmissions = !!contestSubmissions?.length;
		const shouldShowEmpty = (isJuryView && contestJury && !Object.keys(contestJury).length)
			|| (!isJuryView && !hasSubmissions);
		const shouldShowLoader = !contestInfo || !contestSubmissions || !contestJury;

		return (
			<div className='contest'>
				{contestInfo
					&& <ContestHeader
						contestInfo={contestInfo}
						isJuryView={isJuryView}
						juryRewardPercent={juryRewardPercent}
						setJuryView={this.setJuryView}
						setJuryRewardPercent={this.setJuryRewardPercent}
						exportExcel={this.exportExcel}
						isControlsVisible={hasSubmissions}
						isCountRejectAsZero={isCountRejectAsZero}
						setIsCountRejectAsZero={this.setIsCountRejectAsZero}
					/>
				}
				{(hasSubmissions && !shouldShowEmpty)
					&& <div className='contest-table-wrapper'>
						<table className='contest-table'>
							<ContestTableHeader
								contestInfo={contestInfo}
								isJuryView={isJuryView}
								submissionsSortParams={submissionsSortParams}
								jurySortParams={jurySortParams}
								sortSubmissions={this.sortSubmissions}
								sortJury={this.sortJury}
							/>
							<ContestTableBody
								contestSubmissions={contestSubmissions}
								contestJury={contestJury}
								contestAddress={addressFromUrl}
								isJuryView={isJuryView}
								juryRewardPercent={juryRewardPercent}
							/>
						</table>
					</div>
				}
				{shouldShowLoader && <Loader />}
				{(!shouldShowLoader && shouldShowEmpty) && <Loader isFailed/>}
			</div>
		);
	}
}

const mapStateToProps = ({ contest }, { location }) => {
	const { contestsInfo, submissionsInfo, jurorsInfo, removedJurors } = contest;

	const searchString = location.search;
	const searchParams = new URLSearchParams(searchString);
	const addressFromUrl = searchParams.get('contestAddress');
	const contestInfo = contestsInfo[addressFromUrl];
	const contestSubmissions = submissionsInfo[addressFromUrl];
	const contestJury = jurorsInfo[addressFromUrl];
	const removedJurorsForContest = removedJurors[addressFromUrl];

	return {
		contestInfo,
		contestSubmissions,
		contestJury,
		removedJurorsForContest,
		addressFromUrl,
	}
};

const ContestWithRedux = connect(mapStateToProps, {
	setContestInfo,
	setSubmissionsInfo,
	setJuryInfo,
})(Contest);

export default withRouter(ContestWithRedux);
