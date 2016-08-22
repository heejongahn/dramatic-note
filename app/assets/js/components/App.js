// TODO: LabelList 에서 labelNames 프로퍼티 제거, 더미 라벨 제거
// TODO: params.labelId 파라미터 LabelList 한테 selectedLabelId로 넘기기

import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'

import LabelList from './LabelList';

const dummyLabelNames = ["label1", "label2", "label3"]

const App = ({ children, memos, labels }) => {
  return (
    <section className="row">
      <div id="label-list" className="col-md-4">
        <LabelList labelNames={dummyLabelNames} />
      </div>
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
