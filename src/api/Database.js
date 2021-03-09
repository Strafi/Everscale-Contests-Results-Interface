import { createClient } from 'contentful';

class DatabaseApi {
	init() {
		this.client = createClient({
			space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
			environment: 'master',
			accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
		})
	}

	getContests(params = {}) {
		const { skip = 0, government, address } = params;
		const query = {
			skip,
			content_type: 'contest',
		};

		if (government)
			query['fields.government'] = government;

		if (address)
			query['fields.address'] = address;

		return this.client.getEntries(query);
	}

	async getContestByAddress(address) {
		try {
			const res = await this.getContests({ address });
			const contestInfo = res.items[0].fields;
			
			return contestInfo;
		} catch(err) {
			console.warn('No contest found in DB by address: ', address);

			return {}
		}
	}
}

const databaseApi = new DatabaseApi();

export default databaseApi;