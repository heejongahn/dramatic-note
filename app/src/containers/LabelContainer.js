import React from 'react'

import { connect } from 'react-redux'

import { createLabel } from '../actions'
import AddLabelItem from './AddLabelItem'
import LabelItem from './LabelItem'

const LabelContainer = ({ labels, totalNumMemos, selectedLabelId }) => {
  const allMemosLabel = { name: "모든 메모", numMemos: totalNumMemos}
  return (
    <div id="label-container" className="col-md-4">
      <div id="label-panel" className="panel panel-default">
        <div class="panel-heading">
          <LabelItem id="all" label={allMemosLabel} selected={selectedLabelId=="all"}/>
        </div>
        <div class="panel-body">
          <ul id="label-list" className="list-group">
            {Object.keys(labels).map(id => {
              let label = {
                name: labels[id].name,
                numMemos: labels[id].memoIds.length
              }
              return <LabelItem key={id} id={id} label={label} selected={selectedLabelId==id}/>
            })}
          </ul>
        </div>
        <div class="panel-footer">
          <AddLabelItem />
        </div>
      </div>
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
