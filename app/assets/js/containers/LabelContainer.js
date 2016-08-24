// TODO: 라벨 추가 버튼, 모달

// TODO     : redux store와 연결
// state    : labels => LabelItem 인자로 (id, label) 던진다
// dispatch : createLabel (라벨 추가 모달)

// TODO: App에서 받은 selectedLabelId LabelItem 으로 넘기기

import React from 'react'
import { connect } from 'react-redux'

import { createLabel } from '../actions'

import { LabelItem } from '../components'
import AddLabelItem from './AddLabelItem'

const LabelContainer = ({ labels, totalNumMemos, selectedLabelId }) => {
  const allMemosLabel = { name: "모든 메모", numMemos: totalNumMemos}
  return (
    <div id="label-container" className="col-md-4">
      <ul className="list-group">
        <LabelItem id="all" label={allMemosLabel} selected={selectedLabelId=="all"}/>
        {Object.keys(labels).map(id => {
          let label = {
            name: labels[id].name,
            numMemos: labels[id].memoIds.length
          }
          return <LabelItem key={id} id={id} label={label} selected={selectedLabelId==id}/>
        })}
        <AddLabelItem />
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => (
  Object.assign({},
    { numMemos: Object.keys(state.memos).length },
    ownProps
  )
)

export default connect(
  mapStateToProps
)(LabelContainer)
