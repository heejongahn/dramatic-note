import React from 'react';

import MemoItem from './MemoItem';

const MemoList = ({ memos, path }) => {
  return (
    <ul className="list-group">
      {memos.map(memo =>
        <li className="list-group-item">
          <MemoItem memo={memo} path={path} />
        </li>
      )}
    </ul>
  )
}

export default MemoList
