// TODO: Date 포매팅에 타임존 반영

// TODO     : redux store에 연결
// state    : -
// dispatch : onCheckedChange => toggleSelectMemo

import React from 'react';

import { Link } from 'react-router';

const MemoItem = ({ memo, path }) => {
  return (
    <Link to={`/${path}/${memo.id}`}>
      <div className="memo-item">
        <input type="checkbox" value={memo.checked} />
        <b>{memo.title}</b>
        <p>{memo.body}</p>
        <p>{new Date(memo.modifiedAt).toISOString().slice(0, 10)}</p>
      </div>
    </Link>
  )
}

export default MemoItem
