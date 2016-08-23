import React from 'react'

import { Link } from 'react-router'
import { connect } from 'react-redux'
import { updateMemo } from '../actions'


const MemoPanel = ({ params, memo, dispatch } ) => {
  if (params.memoId && memo) {
    return (
      <div className="panel panel-default memo">
        <div className="panel-heading">
          <b className="panel-title memo-title">
            {memo.title}
          </b>
          <Link
            to={`/${params.labelId}/${params.memoId}/edit`}
            className="btn btn-default btn-sm">
            수정
          </Link>
          <button className="btn btn-default btn-sm">삭제</button>
        </div>
        <div className="panel-body">
          <div className="memo-body">
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
