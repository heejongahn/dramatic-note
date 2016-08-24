import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'

import { updateMemo, deleteMemo } from '../actions'

const MemoPanel = ({ params, memo, dispatch } ) => {
  const onDeleteMemo = (id) => {
    dispatch(deleteMemo(id))
  }

  if (params.memoId && memo) {
    return (
      <div className="panel panel-default memo memo-panel">
        <div className="panel-heading">
          <div className="panel-title">
            <span className="memo-title">{memo.title}</span>
            <Link
              to={`/${params.labelId}/${params.memoId}/edit`}
              className="btn btn-default btn-xs memo-edit">
              수정
            </Link>
            <button className="btn btn-default btn-xs memo-delete"
              onClick={()=>onDeleteMemo(params.memoId)}>
              삭제
            </button>
          </div>
        </div>
        <div className="panel-body">
          <div className="memo-body">
            {memo.body}
          </div>
          <span className="memo-date">
            마지막 수정 날짜 : {new Date(memo.modifiedAt).toISOString().slice(0, 10)}
          </span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="panel panel-default memo memo-panel">
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
