import React from 'react'

const MemoPanel = ({ params, memo } ) => {
  if (params.memoId && memo) {
    return (
      <div className="panel panel-default memo">
        <div className="panel-heading">
          <h3 className="panel-title">
            {memo.title}
          </h3>
        </div>
        <div className="panel-body">
          {memo.body}
          <p>
            {new Date(memo.modifiedAt).toISOString().slice(0, 10)}
          </p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="panel panel-default memo">
        <div className="panel-heading">
          <h3 className="panel-title">선택된 메모가 없습니다.</h3>
        </div>
        <div className="panel-body">
        </div>
      </div>
    )
  }
}


export default MemoPanel
