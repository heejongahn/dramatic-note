import React from 'react'
import { Link } from 'react-router'

const dummyMemoIds = ["1", "2", "3"]

const MemoTab = ({ children, params }) => {
  let memoList;

  if (params.labelName) {
    memoList = dummyMemoIds.map(memoId =>
      <li className="list-group-item">
        <Link to={"/"+params.labelName+"/"+memoId}>
          {params.labelName + " memo" + memoId}
        </Link>
      </li>
    );
  } else {
    memoList = null;
  }

  return (
    <div id="memo-tab" className="col-md-8">
      <div id="memo-list" className="col-md-6">
        <ul className="list-group">
          {memoList}
        </ul>
      </div>
      <div id="memo" className="col-md-6">
        { children }
      </div>
    </div>
  )
}

export default MemoTab
