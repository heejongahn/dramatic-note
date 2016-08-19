import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';
import { App } from './components';

import 'bootstrap/dist/css/bootstrap.css';

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>,
  document.getElementById('main')
);
