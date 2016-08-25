import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'

import { updateMemo } from '../../actions'

const EditMemoPanel = ({ params, memo, dispatch } ) => {
  const onEditMemo = () => {
    const title = document.getElementById("memo-title").value
    const body = document.getElementById("memo-body").value

    return dispatch(updateMemo(params.memoId, title, body))
  }

  if (memo) {
    return (
      <div id="edit-memo" className="panel panel-default memo-panel">
        <div className="panel-heading">
          <div className="panel-title">
            <input type="text" defaultValue={memo.title} id="memo-title"/>
          </div>
        </div>
        <div className="panel-body">
          <textarea id="memo-body" rows="20">
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
