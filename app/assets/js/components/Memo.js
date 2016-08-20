// TODO     : redux store 랑 연결
// state    : memos[params.memoId] => memo 프로퍼티로 사용
// dispatch : onMemoChange => updateMemo

import React from 'react'

const dummyMemos = {
  "1": {title: "메모1", body: "바디바디당근", checked: false, modifiedAt: Date.now() },
  "2": {title: "메모2", body: "알레스 클라?", checked: false, modifiedAt: Date.now() },
  "3": {title: "메모3", body: "드라마앤컴퍼니", checked: false, modifiedAt: Date.now() }
}

const Memo = ({ params } ) => {
  if (params.memoId) {
    let memo = dummyMemos[params.memoId];
    return (
      <div className="panel panel-default memo">
        <div className="panel-heading">
          <h3 className="panel-title">{memo.title}</h3>
        </div>
        <div className="panel-body">
          {memo.body}
          <p>{new Date(memo.modifiedAt).toISOString().slice(0, 10)}</p>
        </div>
      </div>
    )
  } else {
    return null
  }
}


export default Memo
