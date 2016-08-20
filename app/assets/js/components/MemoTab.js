import React from 'react'
import { Link } from 'react-router'

import MemoList from './MemoList'

const dummyMemos = [
  { id: 1, title: "메모1", body: "바디바디당근", checked: false, modifiedAt: Date.now() },
  { id: 2, title: "메모2", body: "알레스 클라?", checked: false, modifiedAt: Date.now() },
  { id: 3, title: "메모3", body: "드라마앤컴퍼니", checked: false, modifiedAt: Date.now() }
]

const MemoTab = ({ children, params }) => {
  return (
    <div id="memo-tab" className="col-md-8">
      <div id="memo-list" className="col-md-6">
        <MemoList memos={dummyMemos} path={params.labelName}/>
      </div>
      <div id="memo" className="col-md-6">
        { children }
      </div>
    </div>
  )
}

export default MemoTab
