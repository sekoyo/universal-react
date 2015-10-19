import React from 'react'

class Root extends React.Component {

	render() {
		// Todo: meta
		let bundlePath = this.props.development ? 'bundle.js' : 'bundle.min.js';

		return (
			<html>
				<head>
					<meta charSet='utf-8' />
    				<meta name='viewport' content='width=device-width, initial-scale=1' />
					<title>{this.props.title}</title>
				</head>
				<body>
					<div id='root' dangerouslySetInnerHTML={{__html: this.props.content}} />
					<script src={bundlePath}></script>
				</body>
			</html>
		)
	}
}

export default Root;