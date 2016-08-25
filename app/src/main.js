import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, IndexRedirect } from 'react-router'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import { syncWithDB } from './actions'
import reducers from './reducers'
import { App, MemoContainer } from './containers'
import { MemoPanel, EditMemoPanel } from './containers/memo'

import './main.scss'
import 'bootstrap/dist/css/bootstrap.css'

const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
)

store.dispatch(syncWithDB())

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
)
