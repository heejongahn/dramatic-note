import React from 'react';

import { connect } from 'react-redux'

import { createLabel } from '../actions'

const AddLabelItem = ({ dispatch }) => {
  const onCreateLabel = () => {
    const newLabelForm = document.getElementById('new-label-name')
    const newLabelName = newLabelForm.value
    newLabelForm.value = ""
    return dispatch(createLabel(newLabelName))
  }

  return (
    <li className="list-group-item">
      <form className="form-inline">
        <div className="form-group">
          <input type="text" className="form-control" id="new-label-name" placeholder="새 라벨 이름"/>
        </div>
        <button type="submit"
          className="btn btn-default"
          onClick={e => {
            e.preventDefault()
            onCreateLabel()}
          }>
            새 라벨 생성
          </button>
      </form>
    </li>
  )
}

export default connect()(AddLabelItem)
