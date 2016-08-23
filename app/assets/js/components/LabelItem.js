// TODO: LabelList 에서 받은 id, label 로 프로퍼티 대체
// TODO: LabelList 에서 받은 selectedLabelId 보고 active 처리해주기
// TODO: 해당되는 메모 개수 추가

// TODO: 이름 변경은 여기 들어가야 할 것 같다

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { updateLabel } from '../actions'

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

const LabelItem = ({ id, label, dispatch }) => {
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

  return (
    <li className="list-group-item">
      <Link to={`/${id}`}>
        <span
          id={`label-name-${id}`}
          className="label-name"
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
