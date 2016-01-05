import React, { Component } from 'react';

class Root extends Component {

  renderInitialState() {
    if (this.props.initialState) {
      let innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
      return (
        <script dangerouslySetInnerHTML={{__html: innerHtml}} />
      );
    }
  }

  renderConfig() {
    let innerHtml = `window.CONFIG = ${JSON.stringify(this.props.config)}`;
    return (
      <script dangerouslySetInnerHTML={{__html: innerHtml}} />
    );
  }

  render() {
    const isLocal = process.env.NODE_ENV === undefined;
    const head = this.props.head;
    
    return (
      <html>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {!isLocal && <link rel='stylesheet' type='text/css' href='/style.min.css' />}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.content}} />
          {this.renderInitialState()}
          {this.renderConfig()}
          {head.script.toComponent()}
          <script src={isLocal ? '/bundle.js' : '/bundle.min.js'}></script>
        </body>
      </html>
    );
  }
}

export default Root;