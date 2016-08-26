import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { updateLabel, uncheckAllMemos } from '../../actions'

const toggleEditable = (id) => {
  const labelNameSpan = document.getElementById(`label-name-${id}`)
  const labelUpdateBtn = document.getElementById(`label-update-${id}`)

  if (labelNameSpan.contentEditable=="true") {
    labelNameSpan.contentEditable = "false"
    labelUpdateBtn.style.visibility = "visible"
  } else {
    labelNameSpan.contentEditable = "true"
    labelNameSpan.focus()
    labelUpdateBtn.style.visibility = "hidden"
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
    const labelNameSpan = document.getElementById(`label-name-${id}`)
    const newLabelName = labelNameSpan.innerHTML

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
        <span
          id={`label-name-${id}`}
          className="label-name"
          onKeyPress={(e)=>preventLineBreak(e)}
          onBlur={()=>onUpdateLabel()}>
          {label.name}
        </span>
        <span className="badge">{label.numMemos}</span>
      </Link>
      { labelItemButton }
    </li>
  )
}

export default connect()(LabelItem)
