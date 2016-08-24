import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'

import { updateMemo } from '../actions'


const EditMemoPanel = ({ params, memo, dispatch } ) => {
  const onEditMemo = () => {
    const title = document.getElementsByClassName("memo-title")[0].value
    const body = document.getElementsByClassName("memo-body")[0].value

    return dispatch(updateMemo(params.memoId, title, body))
  }

  if (memo) {
    return (
      <div className="panel panel-default edit-memo memo-panel">
        <div className="panel-heading">
          <div className="panel-title">
            <input type="text" defaultValue={memo.title} className="memo-title"/>
          </div>
        </div>
        <div className="panel-body">
          <textarea className="memo-body" rows="15">
            {memo.body}
          </textarea>
        </div>
        <div className="panel-footer">
          <Link
            to={`/${params.labelId}/${params.memoId}`}
            className="btn btn-default btn-small btn-block"
            onClick={()=>onEditMemo()}>
            수정 완료
          </Link>
        </div>
      </div>
    )
  } else {
    return (
      <div className="panel panel-default memo-panel">
        <div className="panel-heading">
          <div className="panel-title">
            선택된 메모가 없습니다.
          </div>
        </div>
        <div className="panel-body">
        </div>
      </div>
    )
  }
}


export default connect()(EditMemoPanel)
