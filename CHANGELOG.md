#### 1.0.0-rc1

	- Hot reloading for reducers
	- Stop app errors during server-side render from being silently swallowed in a promise
	- `readyOnActions` returns a Promise which simplifies calling code
	- Use Object.assign babel plugin
	- Remove cruft/simplify
	- Removed mocking in preference for having a real mock api
	- Removed css/file loaders as they were too opinionated and not MVP
	- Refactored app config so it's not a shared global but a shared import
	- Use `componentDidMount` for `readyOnAction` calling as `componentWillMount` can leave the store in a half-way state when sent to the client

#### 1.0.0-beta

	- Use Redux, the simplicity was nice but to scale a central store to dispatch to makes good sense.
	- Shared app config.
	- Data mocking.
	- Upgrade to Babel6, react-router2

#### 0.2.3

	- Make bundle path absolute so it works for deep urls

#### 0.2.2

	- Fixed server so that is uses babel-core instead of babel (which is deprecated and also not delcared as a dep)

#### 0.2.1

	- Minor cleanup of some now unused code and put utils in one file

#### 0.2.0

	- Use react-helmet to manage title and meta (instead of custom)

#### 0.1.1

	- Fix wrong error route handler (was using 404)

#### 0.1.0

	- Initial release
