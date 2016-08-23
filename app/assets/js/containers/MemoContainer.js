import React from 'react'

import { EmptyMemoList, MemoItem } from '../components'

const MemoContainer = ({ children, params, memos }) => {
  const labelId = params.labelId
  const visibleMemoIds = Object.keys(memos)
    .filter(id => labelId == "all" || memos[id].labelIds.includes(labelId))

  const VisibleMemoList = visibleMemoIds.length == 0
    ? <EmptyMemoList />
    : visibleMemoIds
      .map(id => <MemoItem key={id} memo={memos[id]} id={id} labelId={labelId} />)

  const MemoPanel = visibleMemoIds.includes(params.memoId)
    ? React.cloneElement(children, { memo: memos[params.memoId] })
    : children

  return (
    <div id="memo-tab" className="col-md-8">
      <div id="memo-list" className="col-md-6">
        { VisibleMemoList }
      </div>
      <div id="memo" className="col-md-6">
        { MemoPanel }
      </div>
    </div>
  )
}

export default MemoContainer
