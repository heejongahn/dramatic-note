// TODO: 선택된 메모들 조작을 위한 컴포넌트 추가

import React from 'react'

import MemoList from '../components/MemoList'

const MemoContainer = ({ children, params, memos }) => {
  let visibleMemos = memos

  if (params.labelId != "all") {
    visibleMemos = Object.keys(memos)
      .filter(id => memos[id].labelIds.includes(params.labelId))
      .map(id => memos[id])
  }

  return (
    <div id="memo-tab" className="col-md-8">
      <div id="memo-list" className="col-md-6">
        <MemoList memos={visibleMemos} path={params.labelId}/>
      </div>
      <div id="memo" className="col-md-6">
        {React.cloneElement(children, { memo: memos[params.memoId] })}
      </div>
    </div>
  )
}

export default MemoContainer
