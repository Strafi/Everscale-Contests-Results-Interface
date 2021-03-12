import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TonApi, DatabaseApi } from 'src/api';
import { exportToExcel, processSubmissionsInfo } from 'src/helpers';
import { setContestInfo, setSubmissionsInfo, setJuryInfo } from 'src/store/actions/contest';
import ContestHeader from './ContestHeader';
import ContestTableHeader from './ContestTableHeader';
import ContestTableBody from './ContestTableBody';
import './index.scss';

class Contest extends Component {
	tableRef = createRef(null)
	state = {
		isJuryView: false,
		juryRewardPercent: 5,
	}

	componentDidMount() {
		try {
			this.fetchSubmissionsInfo();
		} catch(err) {
			console.error('Fetching submissions failed: ', err);

			setTimeout(this.fetchSubmissionsInfo, 5000);
		}
	}

	fetchSubmissionsInfo = async () => {
		const {
			addressFromUrl,
			contestInfo: contestInfoFromRedux,
			setContestInfo,
			setSubmissionsInfo,
			setJuryInfo,
			history
		} = this.props;

		const isValidAddress = await TonApi.isAddressValid(addressFromUrl);

		if (!isValidAddress)
			return history.push('/');

		let fullContestInfo = contestInfoFromRedux;

		if (!fullContestInfo) {
			fullContestInfo = await this.getContestFullInfo(addressFromUrl);

			setContestInfo(fullContestInfo);
		}

		const { submissionsWithStats, juryStats } = await TonApi.getContestSubmissionsAndJurors(addressFromUrl);
		const processedSubmissions = processSubmissionsInfo(submissionsWithStats, fullContestInfo.rewards);

		setSubmissionsInfo(addressFromUrl, processedSubmissions);
		setJuryInfo(addressFromUrl, juryStats);
	}

	getContestFullInfo = async address => {
		const [contestInfoFromBlockchain, contestInfoFromDB] = await Promise.all([
			TonApi.getContestInfo(address),
			DatabaseApi.getContestByAddress(address)
		]);

		return {
			...contestInfoFromBlockchain,
			...contestInfoFromDB,
		}
	}

	setJuryView = (isJuryView) => {
		this.setState({ isJuryView })
	}

	exportExcel = () => {
		const { contestInfo } = this.props;

		if (!contestInfo)
			return;

		try {
			const htmlTable = this.tableRef.current.innerHTML;
			
			exportToExcel(htmlTable, contestInfo.title);
		} catch(err) {
			console.error('Table export failed: ', err);
		}
	}

	render() {
		const { contestSubmissions, contestInfo, contestJury } = this.props;
		const { isJuryView, juryRewardPercent } = this.state;

		if (!contestInfo || !contestSubmissions || !contestJury)
			return (<div>Loading...</div>)

		console.log(contestInfo, contestSubmissions, contestJury);
		return (
			<div className='contest'>
				<ContestHeader
					contestInfo={contestInfo}
					isJuryView={isJuryView}
					setJuryView={this.setJuryView}
					exportExcel={this.exportExcel}
				/>
				<table id='table' className='contest-table' ref={this.tableRef}>
					<ContestTableHeader
						contestInfo={contestInfo}
						isJuryView={isJuryView}
					/>
					<ContestTableBody
						contestSubmissions={contestSubmissions}
						contestJury={contestJury}
						isJuryView={isJuryView}
						juryRewardPercent={juryRewardPercent}
					/>
				</table>
			</div>
		);
	}
}

const mapStateToProps = ({ contest }, { location }) => {
	const { contestsInfo, submissionsInfo, jurorsInfo } = contest;

	const searchString = location.search;
	const searchParams = new URLSearchParams(searchString);
	const addressFromUrl = searchParams.get('contestAddress');
	const contestInfo = contestsInfo.get(addressFromUrl);
	const contestSubmissions = submissionsInfo.get(addressFromUrl);
	const contestJury = jurorsInfo.get(addressFromUrl);

	return {
		contestInfo,
		contestSubmissions,
		contestJury,
		addressFromUrl,
	}
};

const ContestWithRedux = connect(mapStateToProps, {
	setContestInfo,
	setSubmissionsInfo,
	setJuryInfo,
})(Contest);

export default withRouter(ContestWithRedux);
