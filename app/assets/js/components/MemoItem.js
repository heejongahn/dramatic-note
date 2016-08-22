// TODO: Date 포매팅에 타임존 반영

import React from 'react';

import { Link } from 'react-router';

const MemoItem = ({ memo, to }) => {
  return (
    <li className="list-group-item">
      <Link to={to}>
        <div className="memo-item">
          <input type="checkbox" value={memo.checked} />
          <b>{memo.title}</b>
          <p>{memo.body}</p>
          <p>{new Date(memo.modifiedAt).toISOString().slice(0, 10)}</p>
        </div>
      </Link>
    </li>
  )
}

export default MemoItem
