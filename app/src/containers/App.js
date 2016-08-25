import React from 'react';
import { Link } from 'react-router'

import { connect } from 'react-redux'

import LabelContainer from './LabelContainer'

const App = ({ children, memos, labels, params }) => {
  return (
    <div id="app" className="row">
      <LabelContainer
        labels={labels}
        totalNumMemos={Object.keys(memos).length}
        selectedLabelId={params.labelId}/>

      {React.cloneElement(children, { memos })}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, state, ownProps)
}

export default connect(
  mapStateToProps
)(App);
