import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TonApi, DatabaseApi } from 'src/api';
import { exportToExcel, processSubmissionsInfo } from 'src/helpers';
import { setContestInfo, setSubmissionsInfo } from 'src/store/actions/contest';
import ContestHeader from './ContestHeader';
import ContestTableHeader from './ContestTableHeader';
import ContestTableBody from './ContestTableBody';
import './index.scss';

class Contest extends Component {
	tableRef = createRef(null)

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
			contestsInfo,
			setContestInfo,
			setSubmissionsInfo,
			history
		} = this.props;

		const isValidAddress = await TonApi.isAddressValid(addressFromUrl);

		if (!isValidAddress)
			return history.push('/');

		let fullContestInfo = contestsInfo.get(addressFromUrl)

		if (!fullContestInfo) {
			fullContestInfo = await this.getContestFullInfo(addressFromUrl);

			setContestInfo(fullContestInfo);
		}
		const { submissionsWithStats, jurorsStats } = await TonApi.getContestSubmissionsAndJurors(addressFromUrl);
		const processedSubmissions = processSubmissionsInfo(submissionsWithStats, fullContestInfo.rewards);

		console.log(jurorsStats);

		setSubmissionsInfo(addressFromUrl, processedSubmissions);
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

	exportExcel = () => {
		try {
			const htmlTable = this.tableRef.current.outerHTML;
			
			exportToExcel(htmlTable);
		} catch(err) {
			console.error('Table export failed: ', err);
		}
	}

	render() {
		const { submissionsInfo, contestsInfo, addressFromUrl } = this.props;
		const contestInfo = contestsInfo.get(addressFromUrl);
		const contestSubmissions = submissionsInfo.get(addressFromUrl);

		if (!contestInfo || !contestSubmissions)
			return (<div>Loading...</div>)

		console.log(contestInfo, contestSubmissions);
		return (
			<div className="contest">
				<ContestHeader contestInfo={contestInfo} />
				<ContestTableHeader contestInfo={contestInfo} />
				<table ref={this.tableRef}>
					<ContestTableBody contestSubmissions={contestSubmissions} />
				</table>
			</div>
		);
	}
}

const mapStateToProps = ({ contest }, { location }) => {
	const { contestsInfo, submissionsInfo } = contest;

	const searchString = location.search;
	const searchParams = new URLSearchParams(searchString);
	const addressFromUrl = searchParams.get('contestAddress');

	return {
		contestsInfo,
		submissionsInfo,
		addressFromUrl,
	}
};

const ContestWithRedux = connect(mapStateToProps, {
	setContestInfo,
	setSubmissionsInfo,
})(Contest);

export default withRouter(ContestWithRedux);
