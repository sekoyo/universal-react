import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import './scss/App.scss';

class App extends Component {

	render() {
		return (
			<div>
				<Helmet
					title='MyApp'
					titleTemplate='MyApp - %s'
					meta={[
						{'char-set': 'utf-8'},
						{'name': 'description', 'content': 'My super dooper dope app'}
					]}
				/>
				<nav>
					<ul>
						<li><Link to='/'>Users</Link></li>
					</ul>
				</nav>
				<div className='route-content'>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default App;