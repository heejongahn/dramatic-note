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
    <div>
      <button className="btn btn-default">
        <input type="checkbox"
          checked={checkedMemoIds.length != 0}
          onChange={(e)=>onAllMemosToggle(e)}/>
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
