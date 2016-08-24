import React from 'react'

import { connect } from 'react-redux'

import { selectAllMemos, unselectAllMemos } from '../actions'

const MemoHandler = ({ checkedMemoIds, dispatch }) => {
  const onAllMemosToggle = (e) => {
    if (e.target.checked) {
      dispatch(selectAllMemos())
    } else {
      dispatch(unselectAllMemos())
    }
  }

  return (
    <div className="input-group">
      <span className="input-group-addon">
        <input type="checkbox" onClick={(e)=>onAllMemosToggle(e)}/>
      </span>
      <p>하하하</p>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => (
  Object.assign({},
    { checkedMemoIds: Object.keys(state.memos).filter(id => state.memos[id].checked) },
    ownProps)
)

export default connect(mapStateToProps)(MemoHandler)
