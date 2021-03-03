import { createClient } from 'contentful';

class DatabaseApi {
	init() {
		this.client = createClient({
			space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
			environment: 'master',
			accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
		})
	}

	getContests(skip = 0) {
		return this.client.getEntries({ skip });
	}
}

const databaseApi = new DatabaseApi();

export default databaseApi;