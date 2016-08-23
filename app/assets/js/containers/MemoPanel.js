import React from 'react'

import { connect } from 'react-redux'
import { updateMemo } from '../actions'


const MemoPanel = ({ params, memo, dispatch } ) => {
  const onMemoPanelBlur = () => {
    const title = document.getElementsByClassName("panel-title")[0].innerHTML
    const body = document.getElementsByClassName("memo-body")[0].innerHTML

    return dispatch(updateMemo(params.memoId, title, body))
  }

  if (params.memoId && memo) {
    return (
      <div className="panel panel-default memo">
        <div className="panel-heading">
          <h3
            className="panel-title" contentEditable="true"
            onBlur={()=>onMemoPanelBlur()}
          >
            {memo.title}
          </h3>
        </div>
        <div className="panel-body">
          <div
            className="memo-body" contentEditable="true"
            onBlur={()=>onMemoPanelBlur()}
          >
            {memo.body}
          </div>
          <div className="memo-date">
            {new Date(memo.modifiedAt).toISOString().slice(0, 10)}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="panel panel-default memo">
        <div className="panel-heading">
          <h3 className="panel-title">선택된 메모가 없습니다.</h3>
        </div>
        <div className="panel-body">
        </div>
      </div>
    )
  }
}


export default connect()(MemoPanel)
