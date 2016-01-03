import fetchMock from 'fetch-mock';

fetchMock.mock(CONFIG.API.users, 'GET', [{
	id: 1,
	name: 'James Blatterdash'
}, {
	id: 2,
	name: 'Sarah Paelino'
}, {
	id: 3,
	name: 'Simone Ray-De-La-Ray'
}, {
	id: 4,
	name: 'Roberto Museli'
}, {
	id: 5,
	name: 'Steven Papitto'
}]);