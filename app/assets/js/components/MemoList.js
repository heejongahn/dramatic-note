import React from 'react';

import MemoItem from './MemoItem';

const MemoList = ({ memos, path }) => {
  return (
    <ul className="list-group">
      {Object.keys(memos).map(id =>
        <MemoItem memo={memos[id]} to={`/${path}/${id}`} />
      )}
    </ul>
  )
}

export default MemoList
