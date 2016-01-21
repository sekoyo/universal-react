import fetchMock from 'fetch-mock';

const userWithId = new RegExp(CONFIG.apiBase + CONFIG.api.user + '\/([^\/]*)');

const users = {
	1: {
		name: 'James Blatterdash', 
		email: 'James.Blatterdash@gmail.com'
	}, 
	2: {
		name: 'Sarah Paelino',
		email: 'Sarah.Paelino@gmail.com'
	},
	3: {
		name: 'Simone Ray-De-La-Ray',
		email: 'Simone.Ray-De-La-Ray@gmail.com'
	},
	4: {
		name: 'Roberto Museli',
		email: 'Roberto.Museli@gmail.com'
	}, 
	5:{
		name: 'Steven Papitto',
		email: 'Steven.Papitto@gmail.com'
	}
};

fetchMock.mock(userWithId, 'GET', url => {
	let match = url.match(userWithId);

	if (match && match.length === 2) {
		return users[match[1]];
	}

	return 404;
});