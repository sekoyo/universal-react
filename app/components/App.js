import React from 'react'
import { Link } from 'react-router'

class App extends React.Component {
	render() {
		return (
			<div>
				<nav>
					<ul>
						<li><Link to="/">Home</Link></li>
          				<li><Link to="/about">About</Link></li>
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