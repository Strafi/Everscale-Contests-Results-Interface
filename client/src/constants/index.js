const EMPTY_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000';

const EXPLORER_BASE_URL = 'https://ton.live/accounts/accountDetails?id=';

const REWARD_TRIGGER_FOR_INPUT = -1;

const DEFAULT_GOVERNANCE = {
	NAME: 'main',
	FULL_NAME: 'Main',
}

const SORT_BY_VALUES_PARTICIPANTS = {
	DEFAULT: 'place',
	PLACE: 'place',
	REWARD: 'reward',
	SUBMISSION_ID: 'id',
	SCORE: 'score',
	ACCEPTED: 'acceptAmount',
	REJECTED: 'rejectAmount',
}

const SORT_BY_VALUES_JURY = {
	DEFAULT: 'id',
	REWARD: 'reward',
	JURY_ID: 'id',
	TOTAL_VOTES: 'totalVotes',
	ACCEPTED: 'acceptAmount',
	ABSTAINED: 'abstainAmount',
	REJECTED: 'rejectAmount',
}

const DB_CONTENT_TYPES = {
	CONTEST: 'contest',
	GOVERNANCE: 'governance',
}

module.exports = {
	SORT_BY_VALUES_PARTICIPANTS,
	SORT_BY_VALUES_JURY,
	EMPTY_ADDRESS,
	EXPLORER_BASE_URL,
	DB_CONTENT_TYPES,
	DEFAULT_GOVERNANCE,
	REWARD_TRIGGER_FOR_INPUT,
}
