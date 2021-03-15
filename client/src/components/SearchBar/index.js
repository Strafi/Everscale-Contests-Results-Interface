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
		isInvalidAddress: false,
		isSearching: false,
	}

	searchContest = async () => {
		const { inputValue: contestAddress, isSearching } = this.state;
		const { contestsInfo, history, setContestInfo } = this.props;

		if (!contestAddress || isSearching)
			return;

		const isValidAddress = await TonApi.isAddressValid(contestAddress);

		if (!isValidAddress)
			return this.setState({ isInvalidAddress: true });

		const contestInfoFromRedux = contestsInfo[contestAddress];

		if (!contestInfoFromRedux) {
			this.setState({ isSearching: true });

			const contestInfoFromBlockchain = await TonApi.getContestInfo(contestAddress);

			this.setState({ isSearching: false });

			if (!contestInfoFromBlockchain)
				return this.setState({ isInvalidAddress: true });
		
			contestInfoFromBlockchain.address = contestAddress;
			setContestInfo(contestInfoFromBlockchain);
		}

		const contestUrl = createContestUrl(contestAddress);

		return history.push(contestUrl);
	}

	handleInputChange = event => {
		this.setState({
			inputValue: event.target.value,
			isInvalidAddress: false,
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
		const { inputValue, isInvalidAddress, isSearching } = this.state;

		const searchBarClassName = `search-bar-container ${isInvalidAddress ? 'search-bar-container--invalid' : ''} ${isSearching
			? 'search-bar-container--searching' : ''
		}`;

		return (
			<div className={searchBarClassName}>
				<input
					className='search-bar-container__input'
					type='text'
					placeholder='Enter contest address'
					value={inputValue}
					onChange={this.handleInputChange}
					onKeyPress={this.handleKeyPress}
				/>
				<LensIcon onClick={this.searchContest} />
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
