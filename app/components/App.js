import React from 'react'
import { Link } from 'react-router'

class App extends React.Component {

	// These will be used if a deeper route component hasn't defined them.
	static pageTitle = 'MyApp'

	static meta = [{
		name: 'description',
		content: 'My super dooper dope app'
	}]

	render() {
		return (
			<div>
				<nav>
					<ul>
						<li><Link to="/">Home</Link></li>
          				<li><Link to="/users">Users</Link></li>
					</ul>
				</nav>
				<div className="route-content">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default App;