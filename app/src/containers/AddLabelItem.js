import React from 'react';

import { connect } from 'react-redux'

import { createLabel } from '../actions'

const AddLabelItem = ({ labelNames, dispatch }) => {
  const onCreateLabel = () => {
    const newLabelForm = document.getElementById('new-label-name')
    const newLabelFormGroup = document.getElementById('new-label-form-group')
    const newLabelHelper = document.getElementById('new-label-helper')

    const newLabelName = newLabelForm.value

    if (labelNames.includes(newLabelName)) {
      newLabelHelper.innerHTML = "이미 존재하는 라벨 이름입니다."
      newLabelFormGroup.className = "form-group col-md-9 has-error"
    } else if (newLabelName == "") {
      newLabelHelper.innerHTML = "이름이 없는 라벨은 생성할 수 없습니다."
      newLabelFormGroup.className = "form-group col-md-9 has-error"
    } else {
      newLabelForm.value = ""
      newLabelHelper.innerHTML = ""
      newLabelFormGroup.className = "form-group col-md-9"
      return dispatch(createLabel(newLabelName))
    }
  }

  return (
    <div id="add-label-item">
      <form className="form-inline row">
        <div id="new-label-form-group" className="form-group col-md-9">
          <input type="text" className="form-control" id="new-label-name" placeholder="새 라벨 이름"/>
          <span id="new-label-helper" className="help-block"></span>
        </div>
        <button type="submit"
          className="btn btn-default col-md-2"
          onClick={e => {
            e.preventDefault()
            onCreateLabel()}
          }>
            생성
          </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => (
  Object.assign({},
    { labelNames: Object.keys(state.labels).map(id => state.labels[id].name) },
    ownProps
  )
)

export default connect(mapStateToProps)(AddLabelItem)
