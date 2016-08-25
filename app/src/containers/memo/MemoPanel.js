import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'

import { updateMemo, deleteMemo } from '../../actions'
import NewMemoPanel from './NewMemoPanel'

const MemoPanel = ({ params, memo, dispatch } ) => {
  const onDeleteMemo = (id) => {
    dispatch(deleteMemo(id))
  }

  if (params.memoId && memo) {
    return (
      <div className="panel panel-default memo memo-panel">
        <div className="panel-heading">
          <div className="panel-title">
            <span id="memo-title">{memo.title}</span>
            <Link
              to={`/${params.labelId}/${params.memoId}/edit`}
              id="memo-edit"
              className="btn btn-default btn-xs">
              수정
            </Link>
            <button id="memo-delete" className="btn btn-default btn-xs"
              onClick={()=>onDeleteMemo(params.memoId)}>
              삭제
            </button>
          </div>
        </div>
        <div className="panel-body">
          <div id="memo-body">
            {memo.body}
          </div>
          <span id="memo-date">
            마지막 수정 날짜 : {new Date(memo.modifiedAt).toISOString().slice(0, 10)}
          </span>
        </div>
      </div>
    )
  } else {
    return <NewMemoPanel />
  }
}


export default connect()(MemoPanel)
