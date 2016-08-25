import React from 'react'

const EmptyMemoList = () => {
  return (
    <div id="empty-memo-list" className="panel panel-default memo-panel">
      <div className="jumbotron">
        <h1>메모 없음</h1>
        <p>이 라벨이 붙어 있는 메모가 없습니다. 지금 바로 새로운 메모를 생성하거나, 라벨을 붙여보세요!</p>
      </div>
    </div>
  )
}

export default EmptyMemoList
