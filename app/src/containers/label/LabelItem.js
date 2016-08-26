import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { updateLabel, uncheckAllMemos } from '../../actions'

const toggleEditable = (id) => {
  const labelNameSpan = document.getElementById(`label-name-${id}`)
  const labelNameEdit = document.getElementById(`label-name-edit-${id}`)
  const labelUpdateBtn = document.getElementById(`label-update-${id}`)

  if (labelNameSpan.style.display == "none") {
    labelNameSpan.style.display = "inline"
    labelUpdateBtn.style.display = "inline"
    labelNameEdit.style.display = "none"
  } else {
    labelNameSpan.style.display = "none"
    labelUpdateBtn.style.display = "none"
    labelNameEdit.style.display = "inline"
    labelNameEdit.focus()
  }
}

const preventLineBreak = (e) => {
  if (e.which == 13) {
    e.target.blur()
    return false
  }
  return true
}

const LabelItem = ({ id, label, selected, dispatch }) => {
  const onUpdateLabel = () => {
    const labelNameEdit = document.getElementById(`label-name-edit-${id}`)
    const newLabelName = labelNameEdit.value

    dispatch(updateLabel(id, newLabelName))
    toggleEditable(id)
  }


  const labelItemButton = (id == 'all')
    ? <Link to={`/${id}`} className="btn btn-default btn-xs">새 글 작성</Link>
    : <button
        id={`label-update-${id}`}
        className="btn btn-default btn-xs"
        onClick={()=>toggleEditable(id)}>
          수정
        </button>


  const labelItemClass = selected
    ? "list-group-item label-item selected"
    : "list-group-item label-item"

  return (
    <li className={labelItemClass}>
      <Link to={`/${id}`} onClick={()=>{
        document.getElementById("labels-dropdown-list").style.visibility="hidden"
        dispatch(uncheckAllMemos())}}>
        <span id={`label-name-${id}`} className="label-name-group">
          <span className="label-name">
            {label.name}
          </span>
          <span className="badge">{label.numMemos}</span>
        </span>
        <input
          id={`label-name-edit-${id}`}
          className="form-control label-name-edit"
          defaultValue={label.name}
          onKeyPress={(e)=>preventLineBreak(e)}
          onBlur={()=>{onUpdateLabel()}} />
      </Link>
      { labelItemButton }
    </li>
  )
}

export default connect()(LabelItem)
