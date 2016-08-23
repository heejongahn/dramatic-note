// TODO: Date 포매팅에 타임존 반영

import React from 'react';

import { Link } from 'react-router';
import { connect } from 'react-redux'

import { toggleSelectMemo } from '../actions'

const MemoItem = ({ memo, id, labelId, dispatch }) => {
  return (
    <li className="list-group-item">
      <div className="memo-item">
        <input
          type="checkbox"
          value={memo.checked}
          onChange={()=>dispatch(toggleSelectMemo({ id }))}
        />
        <Link to={`/${labelId}/${id}`}>
            <b>{memo.title}</b>
            <p>{memo.body}</p>
        </Link>
        <p>{new Date(memo.modifiedAt).toISOString().slice(0, 10)}</p>
      </div>
    </li>
  )
}

export default connect()(MemoItem)
