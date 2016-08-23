import React from 'react'

const EmptyMemoList = () => {
  return (
    <div className="panel panel-default empty-memo">
      <div className="panel-heading">
        <h3 className="panel-title">해당 라벨이 붙은 메모가 없습니다.</h3>
      </div>
      <div className="panel-body">
        ~_~
      </div>
    </div>
  )
}

export default EmptyMemoList
