import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

class Home extends Component {

	render() {
		return (
			<div>
				<Helmet title='Home' />
				Hello from Home
			</div>
		)
	}
}

export default Home;