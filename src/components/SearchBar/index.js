/* eslint-disable camelcase */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setContestInfo } from 'src/store/actions/contest';
import { TonApi } from 'src/api';
import { createContestUrl } from 'src/helpers';
import { LensIcon } from 'src/components/icons';
import './index.scss';

class SearchBar extends Component {
	state = {
		inputValue: '',
	}

	searchContest = async () => {
		const { inputValue: contestAddress } = this.state;
		const { contestsInfo, history, setContestInfo } = this.props;

		const isValidAddress = await TonApi.isAddressValid(contestAddress);

		if (!isValidAddress)
			return history.push('/');

		const contestInfoFromRedux = contestsInfo.get(contestAddress);

		if (!contestInfoFromRedux) {
			const contestInfoFromBlockchain = await TonApi.getContestInfo(contestAddress);
			contestInfoFromBlockchain.address = contestAddress;

			setContestInfo(contestInfoFromBlockchain);
		}

		const contestUrl = createContestUrl(contestAddress);

		return history.push(contestUrl);
	}

	handleInputChange = event => {
		this.setState({
			inputValue: event.target.value
		});
	}

	handleKeyPress = event => {
		const { shiftKey, key, altKey } = event;
		const isEnter = key === 'Enter';
		const shouldSearch = isEnter && !shiftKey && !altKey;

		if (shouldSearch) {
			event.preventDefault();
			this.searchContest();
		}
	}

	render() {
		const { inputValue } = this.state;

		return (
			<div className='search-bar-container'>
				<input
					className='search-bar-container__input'
					type='text'
					placeholder='Enter contest address'
					value={inputValue}
					onChange={this.handleInputChange}
					onKeyPress={this.handleKeyPress}
				/>
				<LensIcon />
			</div>
		);
	}
}

const mapStateToProps = ({ contest }) => {
	const { contestsInfo } = contest;

	return { contestsInfo }
};

const SearchBarWithRedux = connect(mapStateToProps, {
	setContestInfo,
})(SearchBar);

export default withRouter(SearchBarWithRedux);
