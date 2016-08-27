import React from 'react'

import { connect } from 'react-redux'

import { checkMemos, deleteMemos, uncheckAllMemos,
  addLabelToMemos, removeLabelFromMemos} from '../../actions'

const MemoHandler = ({ memoIds, checkedMemoIds, labels, currentLabelId, dispatch }) => {
  const onAllMemosToggle = (e) => {
    if (e.target.checked) {
      dispatch(checkMemos({ ids: memoIds }))
    } else {
      dispatch(uncheckAllMemos())
    }
  }

  const onDropdownCheckboxToggle = (e, labelId) => {
    if (e.target.checked) {
      dispatch(addLabelToMemos(labelId, checkedMemoIds))
    } else {
      dispatch(removeLabelFromMemos(labelId, checkedMemoIds))
      if (labelId == currentLabelId) {
        dispatch(uncheckAllMemos())
        toggleLabelsDropdown()
      }
    }
  }

  const hasMemoWithLabel = (memoIds, labelId) => {
    return memoIds.map(memoId => {
      return labels[labelId].memoIds.includes(memoId)
    }).includes(true)
  }

  const toggleLabelsDropdown = () => {
    const dropdown = document.getElementById("labels-dropdown")
    const dropdownList = document.getElementById("labels-dropdown-list")

    if (dropdownList.style.visibility == "visible") {
      dropdown.style.zIndex = "0"
      dropdownList.style.visibility = "hidden"
    } else {
      dropdown.style.zIndex = "1"
      dropdownList.style.visibility = "visible"
    }
  }

  return (
    <div id="memo-handler" className="btn-group btn-group-justified" role="group">
      <div className="btn-group" role="group">
        <span className="btn btn-default">
          <input type="checkbox"
            checked={memoIds.length > 0 && checkedMemoIds.length == memoIds.length}
            onChange={(e)=>onAllMemosToggle(e)}
            disabled={memoIds.length == 0}/>
        </span>
      </div>
      <div className="btn-group" role="group">
        <button className="btn btn-default"
          onClick={(e)=>dispatch(deleteMemos(checkedMemoIds))}
          disabled={checkedMemoIds.length == 0}>
          삭제
        </button>
      </div>
      <div className="btn-group" role="group">
        <div id="labels-dropdown" className="dropdown">
          <button id="labels-dropdown-trigger"
            className="btn btn-default"
            type="button"
            onClick={()=>toggleLabelsDropdown()}
            disabled={checkedMemoIds.length == 0}>
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
    </div>
  )
}

const mapStateToProps = (state, ownProps) => (
  Object.assign({},
    { checkedMemoIds: state.checkedMemoIds, labels: state.labels },
    ownProps)
)

export default connect(mapStateToProps)(MemoHandler)
