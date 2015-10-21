import React from 'react'

class Root extends React.Component {

	createMeta() {
		if (this.props.meta) {
			return this.props.meta.map((attrs, i) => {
				return <meta key={i} {...attrs} />;
			});
		}
	}

	createInitialData() {
		if (this.props.initialData) {
			return (
				<script id='initialData' type='application/json' 
					dangerouslySetInnerHTML={{__html: this.props.initialData}} />
			);
		}
	}

	render() {
		const bundlePath = this.props.development ? 'bundle.js' : 'bundle.min.js';

		let routeMeta = this.createMeta();
		let initialData = this.createInitialData();

		return (
			<html>
				<head>
					<meta charSet='utf-8' />
    				<meta name='viewport' content='width=device-width, initial-scale=1' />
    				{routeMeta}
					<title>{this.props.pageTitle}</title>
					{initialData}
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