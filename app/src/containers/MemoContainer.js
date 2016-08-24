import React from 'react'

import { connect } from 'react-redux'

import MemoHandler from './MemoHandler'
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
    <div id="memo-container" className="col-md-8">
      <div className="col-md-6">
        <MemoHandler memoIds={visibleMemoIds}/>
        <div id="memo-list">
          <ul className="list-group">
            { VisibleMemoList }
          </ul>
        </div>
      </div>
      <div id="memo" className="col-md-6">
        { MemoPanel }
      </div>
    </div>
  )
}

export default connect()(MemoContainer)
