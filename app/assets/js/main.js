import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import { App } from './containers';
import { MemoTab, Memo } from './components';
import reducers from './reducers'
import { populate } from './actions'

import 'bootstrap/dist/css/bootstrap.css';

const dummyLabelNames = ["label1", "label2", "label3"]
const dummyMemoIds = [1, 2, 3]

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
        <IndexRoute component={MemoTab} />
        {dummyLabelNames.map(labelName =>
          <Route path=":labelName" component={MemoTab}>
            <IndexRoute component={Memo} />
            <Route path=":memoId" component={Memo} />
          </Route>
        )}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
