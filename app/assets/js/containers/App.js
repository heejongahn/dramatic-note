// TODO: LabelList 에서 labelNames 프로퍼티 제거, 더미 라벨 제거
// TODO: params.labelId 파라미터 LabelList 한테 selectedLabelId로 넘기기

import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'

import LabelContainer from './LabelContainer';

const App = ({ children, memos, labels, params }) => {
  return (
    <section className="row">
      <LabelContainer
        labels={labels}
        totalNumMemos={Object.keys(memos).length}
        selectedLabelId={params.labelId}/>

      {React.cloneElement(children, { memos })}
    </section>
  )
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, state, ownProps)
}

export default connect(
  mapStateToProps
)(App);
