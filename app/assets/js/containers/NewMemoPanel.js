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
    <div className="col-md-8 col-md-offset-2">
      <div className="panel panel-default new-memo">
        <div className="panel-heading">
          <div className="panel-title">
            <input type="text" className="new-memo-title"/>
          </div>
        </div>
        <div className="panel-body">
          <textarea className="new-memo-body">
          </textarea>
        </div>
        <div className="panel-footer">
          <button
            className="btn btn-default btn-small btn-block"
            onClick={()=>onCreateMemo()}>
            메모 생성
          </button>
        </div>
      </div>
    </div>
  )
}


export default connect()(NewMemoPanel)
