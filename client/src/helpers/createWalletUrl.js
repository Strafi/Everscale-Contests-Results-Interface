import { EXPLORER_BASE_URL } from 'src/constants';

function createWalletUrl(wallet) {
	return `${EXPLORER_BASE_URL}${wallet}`;
}

export default createWalletUrl;
