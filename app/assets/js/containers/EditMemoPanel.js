import React from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router'

import { updateMemo } from '../actions'


const EditMemoPanel = ({ params, memo, dispatch } ) => {
  const onEditMemo = () => {
    const title = document.getElementsByClassName("memo-title")[0].value
    const body = document.getElementsByClassName("memo-body")[0].value

    return dispatch(updateMemo(params.memoId, title, body))
  }

  return (
    <div className="panel panel-default memo">
      <div className="panel-heading">
        <div className="panel-title">
          <input type="text" defaultValue={memo.title} className="memo-title"/>
        </div>
      </div>
      <div className="panel-body">
        <textarea className="memo-body">
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
}


export default connect()(EditMemoPanel)
