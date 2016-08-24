import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'

import { deleteMemo, toggleSelectMemo } from '../actions'

const MemoItem = ({ memo, id, labelId, checked, dispatch }) => {
  return (
    <li className="list-group-item">
      <div className="memo-item row">
        <div className="col-md-1">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e)=>dispatch(toggleSelectMemo({ id }))}
          />
        </div>
        <div className="col-md-8">
          <Link to={`/${labelId}/${id}`}>
            <b className="memo-item-title">{memo.title}</b>
            <p className="memo-item-preview">{memo.body}</p>
          </Link>
          <span className="memo-item-date">마지막 수정 날짜: {new Date(memo.modifiedAt).toISOString().slice(0, 10)}</span>
        </div>
        <div className="col-md-2">
          <button className="btn btn-default btn-xs memo-delete"
            onClick={()=>dispatch(deleteMemo(id))}>
            삭제
          </button>
        </div>
      </div>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({},
    { checked: state.checkedMemoIds.includes(ownProps.id) },
    ownProps
  )
}

export default connect(mapStateToProps)(MemoItem)
