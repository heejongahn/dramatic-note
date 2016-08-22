// TODO: LabelList 에서 labelNames 프로퍼티 제거, 더미 라벨 제거
// TODO: params.labelId 파라미터 LabelList 한테 selectedLabelId로 넘기기

import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'

import LabelContainer from './LabelContainer';

const dummyLabels = {
  1: { name: "라벨 1", memoIds: [1,2,3,4,5]},
  2: { name: "라벨 2", memoIds: [2,3,4]},
  3: { name: "라벨 3", memoIds: [6,4,5,3]}
}

const App = ({ children, memos, labels }) => {
  return (
    <section className="row">
      <LabelContainer labels={dummyLabels} />
      { children }
    </section>
  )
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, state, ownProps)
}

export default connect(
  mapStateToProps
)(App);
