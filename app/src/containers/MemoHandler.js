import React from 'react'

import { connect } from 'react-redux'

import { selectMemos, deleteMemos, unselectAllMemos,
  addLabelToMemos, removeLabelFromMemos} from '../actions'

const MemoHandler = ({ checkedMemoIds, labels, memoIds, dispatch }) => {
  const onAllMemosToggle = (e) => {
    if (e.target.checked) {
      dispatch(selectMemos(memoIds))
    } else {
      dispatch(unselectAllMemos())
    }
  }

  const onDropdownCheckboxToggle = (e, labelId) => {
    if (e.target.checked) {
      dispatch(addLabelToMemos(labelId, checkedMemoIds))
    } else {
      dispatch(removeLabelFromMemos(labelId, checkedMemoIds))
    }
  }

  const hasMemoWithLabel = (memoIds, labelId) => {
    return memoIds.map(memoId => {
      return labels[labelId].memoIds.includes(memoId)
    }).includes(true)
  }

  const onLabelsDropdownToggle = () => {
    const dropdownList = document.getElementById("labels-dropdown-list")

    if (dropdownList.style.visibility == "visible") {
      dropdownList.style.visibility = "hidden"
    } else {
      dropdownList.style.visibility = "visible"
    }
  }

  return (
    <div>
      <span className="btn btn-default">
        <input type="checkbox"
          checked={memoIds.length > 0 && checkedMemoIds.length == memoIds.length}
          onChange={(e)=>onAllMemosToggle(e)}
          disabled={memoIds.length == 0}/>
      </span>
      <button className="btn btn-default"
        onClick={(e)=>dispatch(deleteMemos(checkedMemoIds))}
        disabled={checkedMemoIds.length == 0}>
        삭제
      </button>
      <div id="labels-dropdown" className="dropdown">
        <button id="labels-dropdown-trigger" className="btn btn-default" type="button" onClick={()=>onLabelsDropdownToggle()}>
          라벨 지정
          <span className="caret"></span>
        </button>
        <ul id="labels-dropdown-list" className="list-group">
          {Object.keys(labels).map(labelId => {
            return (
              <li className="list-group-item" key={labelId}>
                <input type="checkbox"
                  checked={hasMemoWithLabel(checkedMemoIds, labelId)}
                  onChange={(e)=>onDropdownCheckboxToggle(e, labelId)}/>
                {labels[labelId].name}
              </li>
            )}
          )}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => (
  Object.assign({},
    { checkedMemoIds: state.checkedMemoIds, labels: state.labels },
    ownProps)
)

export default connect(mapStateToProps)(MemoHandler)
