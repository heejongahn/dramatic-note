import React from 'react'

import { connect } from 'react-redux'

import { createMemo } from '../actions'


const NewMemoPanel = ({ dispatch } ) => {
  const onCreateMemo = () => {
    const title = document.getElementsByClassName("new-memo-title")[0].value
    const body = document.getElementsByClassName("new-memo-body")[0].value

    return dispatch(createMemo(title, body))
  }

  return (
    <div className="col-md-6 col-md-offset-3">
      <div className="panel panel-default new-memo memo-panel">
        <div className="panel-heading">
          <div className="panel-title">
            <input type="text" className="new-memo-title" placeholder="제목"/>
          </div>
        </div>
        <div className="panel-body">
          <textarea className="new-memo-body" placeholder="내용">
          </textarea>
        </div>
        <div className="panel-footer">
          <a
            className="btn btn-default btn-small btn-block"
            onClick={()=>onCreateMemo()}>
            메모 생성
          </a>
        </div>
      </div>
    </div>
  )
}


export default connect()(NewMemoPanel)
