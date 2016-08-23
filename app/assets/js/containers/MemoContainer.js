import React from 'react'

import MemoItem from '../components/MemoItem'

const MemoContainer = ({ children, params, memos }) => {
  const labelId = params.labelId
  const MemoPanel = Object.keys(memos).includes(params.memoId)
    ? React.cloneElement(children, { memo: memos[params.memoId] })
    : children

  return (
    <div id="memo-tab" className="col-md-8">
      <div id="memo-list" className="col-md-6">
        <ul className="list-group">
          {Object.keys(memos)
            .filter(id => labelId == "all" || memos[id].labelIds.includes(labelId))
            .map(id => <MemoItem key={id} memo={memos[id]} to={`/${labelId}/${id}`} />) }
        </ul>
      </div>
      <div id="memo" className="col-md-6">
        { MemoPanel }
      </div>
    </div>
  )
}

export default MemoContainer
