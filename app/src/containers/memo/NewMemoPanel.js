import React from 'react'

import { connect } from 'react-redux'

import { createMemo, addLabelToMemos } from '../../actions'

const NewMemoPanel = ({ dispatch, labelId } ) => {
  const onCreateMemo = () => {
    const titleInput = document.getElementById("new-memo-title")
    const bodyTextarea = document.getElementById("new-memo-body")

    const newMemoFormGroup = document.getElementById("new-memo")
    const newMemoHelper = document.getElementById("new-memo-helper")

    const title = titleInput.value
    const body = bodyTextarea.value

    if (title == "" || body == "") {
      newMemoFormGroup.className = "form-group has-error"
      newMemoHelper.innerHTML = "빈 제목 또는 내용의 메모를 생성할 수 없습니다."
    } else {
      titleInput.value = ""
      bodyTextarea.value = ""
      newMemoHelper.innerHTML = ""
      newMemoFormGroup.className = "form-group"

      dispatch(createMemo(title, body, labelId))
    }
  }

  return (
    <div id="new-memo" className="form-group">
      <div className="panel panel-default memo-panel">
        <div className="panel-heading">
          <div className="panel-title">
            <input type="text" id="new-memo-title" placeholder="제목"/>
          </div>
        </div>
        <div className="panel-body">
          <textarea id="new-memo-body" placeholder="내용" rows="3">
          </textarea>
        </div>
        <div className="panel-footer">
          <a
            className="btn btn-default btn-small btn-block"
            onClick={()=>onCreateMemo()}>
            메모 생성
          </a>
        </div>
      </div>
      <span id="new-memo-helper" className="help-block"></span>
    </div>
  )
}


export default connect()(NewMemoPanel)
