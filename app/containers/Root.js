/* globals ENVIRONMENT */
/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

function renderInitialState(initialState) {
  const innerHtml = `window.INITIAL_STATE = ${JSON.stringify(initialState)}`;
  return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />;
}

function renderEnvironment() {
  const innerHtml = `window.ENVIRONMENT = '${ENVIRONMENT}'`;
  return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />;
}

const Root = ({ content, head, initialState }) => (
  <html lang="en">
    <head>
      {head.title.toComponent()}
      {head.meta.toComponent()}
      {head.link.toComponent()}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      {renderEnvironment()}
      {initialState && renderInitialState(initialState)}
      {head.script.toComponent()}
      <script src={!process.env.NODE_ENV ? '/app.js' : '/app.min.js'} />
    </body>
  </html>
);

Root.propTypes = {
  content: PropTypes.string.isRequired,
  head: PropTypes.shape({}).isRequired,
  initialState: PropTypes.shape({}),
};

export default Root;
