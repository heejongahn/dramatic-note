import React from 'react'

import { connect } from 'react-redux'

import { selectMemos, unselectAllMemos } from '../actions'

const MemoHandler = ({ memoIds, checkedMemoIds, dispatch }) => {
  const onAllMemosToggle = (e) => {
    if (e.target.checked) {
      dispatch(selectMemos(memoIds))
    } else {
      dispatch(unselectAllMemos())
    }
  }

  return (
    <div className="input-group">
      <span className="input-group-addon">
        <input type="checkbox"
          checked={checkedMemoIds.length != 0}
          onChange={(e)=>onAllMemosToggle(e)}/>
      </span>
      <p>하하하</p>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => (
  Object.assign({},
    { checkedMemoIds: state.checkedMemoIds },
    ownProps)
)

export default connect(mapStateToProps)(MemoHandler)
