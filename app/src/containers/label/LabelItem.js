import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { updateLabel, unselectAllMemos } from '../../actions'

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


  const editLabelButton = (id == 'all')
    ? null
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
      <Link to={`/${id}`} onClick={()=>dispatch(unselectAllMemos())}>
        <span
          id={`label-name-${id}`}
          className="label-name"
          onKeyPress={(e)=>preventLineBreak(e)}
          onBlur={()=>onUpdateLabel()}>
          {label.name}
        </span>
        <span> [{label.numMemos}]</span>
      </Link>
      { editLabelButton }
    </li>
  )
}

export default connect()(LabelItem)
