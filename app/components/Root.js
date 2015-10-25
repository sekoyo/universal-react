import React, { Component } from 'react'
import result from '../utils/result'

class Root extends Component {

	renderMeta() {
		if (this.props.meta) {
			let meta = result(this.props, 'meta');
			return meta.map((attrs, i) => {
				return <meta key={i} {...attrs} />;
			});
		}
	}

	renderInitialData() {
		if (this.props.initialData) {
			let innerHtml = `window.__initialData__ = ${JSON.stringify(this.props.initialData)}`;
			return (
				<script dangerouslySetInnerHTML={{__html: innerHtml}} />
			);
		}
	}

	render() {
		const isDeveloping = process.env.NODE_ENV !== 'production';

		return (
			<html>
				<head>
					<meta charSet='utf-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					{this.renderMeta()}
					<title>{result(this.props, 'pageTitle')}</title>
					{!isDeveloping ? <link rel="stylesheet" type="text/css" href="style.min.css" /> : null}
				</head>
				<body>
					<div id='root' dangerouslySetInnerHTML={{__html: this.props.content}} />
					{this.renderInitialData()}
					<script src={isDeveloping ? 'bundle.js' : 'bundle.min.js'}></script>
				</body>
			</html>
		);
	}
}

export default Root;