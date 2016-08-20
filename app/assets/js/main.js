import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { App, MemoTab, Memo } from './components';

import 'bootstrap/dist/css/bootstrap.css';

const dummyLabelNames = ["label1", "label2", "label3"]
const dummyMemoIds = [1, 2, 3]

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MemoTab} />
      {dummyLabelNames.map(labelName =>
        <Route path=":labelName" component={MemoTab}>
          <IndexRoute component={Memo} />
          <Route path=":memoId" component={Memo} />
        </Route>
      )}
    </Route>
  </Router>,
  document.getElementById('main')
);
