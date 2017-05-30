import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

const App = ({ children }) => (
  <div>
    <Helmet
      title="MyApp"
      titleTemplate="MyApp - %s"
      meta={[
        { 'char-set': 'utf-8' },
        { name: 'description', content: 'My super dooper dope app' },
      ]}
    />
    <nav>
      <ul>
        <li><Link to="/">Users</Link></li>
      </ul>
    </nav>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default App;
