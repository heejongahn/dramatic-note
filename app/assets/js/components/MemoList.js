// TODO     : redux store랑 연결
// state    : memos => ownProps.labelId 랑 같이 사용해서 filter
// dispatch : onDeleteButtonClicked => deleteMemo

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
