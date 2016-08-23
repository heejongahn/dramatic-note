import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import { App, MemoContainer, MemoPanel, EditMemoPanel } from './containers';
import reducers from './reducers'
import { populate } from './actions'

import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
)

const headers = new Headers({ "Content-type": "application/json" })

fetch('/all_data', { method: 'GET', headers})
.then(response => response.json())
.then(result => {
  return store.dispatch(populate(result['result']))
})

ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="all" />
        <Route path=":labelId" component={MemoContainer}>
          <IndexRoute component={MemoPanel} />
          <Route path=":memoId" component={MemoPanel} />
          <Route path=":memoId/edit" component={EditMemoPanel} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
