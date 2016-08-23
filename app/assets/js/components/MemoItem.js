// TODO: Date 포매팅에 타임존 반영

import React from 'react';

import { Link } from 'react-router';
import { connect } from 'react-redux'

import { toggleSelectMemo } from '../actions'

const MemoItem = ({ memo, id, labelId, dispatch }) => {
  return (
    <li className="list-group-item">
      <div className="memo-item row">
        <div className="col-md-1">
          <input
            type="checkbox"
            value={memo.checked}
            onChange={()=>dispatch(toggleSelectMemo({ id }))}
          />
        </div>
        <div className="col-md-10">
          <Link to={`/${labelId}/${id}`}>
            <b className="memo-item-title">{memo.title}</b>
            <p className="memo-item-preview">{memo.body}</p>
          </Link>
        </div>
      </div>
      <span className="memo-item-date">마지막 수정 날짜: {new Date(memo.modifiedAt).toISOString().slice(0, 10)}</span>
    </li>
  )
}

export default connect()(MemoItem)
