import React from 'react'

import { connect } from 'react-redux'

import { selectMemos, deleteMemos, unselectAllMemos } from '../actions'

const MemoHandler = ({ memoIds, checkedMemoIds, dispatch }) => {
  const onAllMemosToggle = (e) => {
    if (e.target.checked) {
      dispatch(selectMemos(memoIds))
    } else {
      dispatch(unselectAllMemos())
    }
  }

  return (
    <div>
      <span className="btn btn-default">
        <input type="checkbox"
          checked={memoIds.length > 0 &&checkedMemoIds.length == memoIds.length}
          onChange={(e)=>onAllMemosToggle(e)}
          disabled={memoIds.length == 0}/>
      </span>
      <button className="btn btn-default"
        onClick={(e)=>dispatch(deleteMemos(checkedMemoIds))}
        disabled={checkedMemoIds.length == 0}>
        삭제
      </button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => (
  Object.assign({},
    { checkedMemoIds: state.checkedMemoIds },
    ownProps)
)

export default connect(mapStateToProps)(MemoHandler)
