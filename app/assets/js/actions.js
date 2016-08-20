/*
 * Actions on Label
 */
export const CREATE_LABEL = 'CREATE_LABEL'
export const UPDATE_LABEL = 'UPDATE_LABEL'
export const DELETE_LABEL = 'DELETE_LABEL'
export const SELECT_LABEL = 'SELECT_LABEL'

export const localCreateLabel = (name) => ({ type: CREATE_LABEL, name })
export const localUpdateLabel = (id, name) => ({ type: UPDATE_LABEL, id, name })
export const localDeleteLabel = (id) => ({ type: DELETE_LABEL, id })
export const localSelectLabel = (id) => ({ type: SELECT_LABEL, id })

/* Async action creators */
export const createLabel = (name) => {
  return (dispatch) => {
    dispatch(localCreateLabel(name))
    fetch('/label', { method: 'POST', body: JSON.stringify({ name }) })
  }
}

export const updateLabel = (id, name) => {
  return (dispatch) => {
    dispatch(localUpdateLabel(id, name))
    fetch(`/label/${id}`, { method: 'PUT', body: JSON.stringify({ name }) })
  }
}

export const deleteLabel = (id) => {
  return (dispatch) => {
    dispatch(localDeleteLabel(id))
    fetch(`/label/${id}`, { method: 'DELETE' })
  }
}

/*
 * Actions on Memo
 */
export const CREATE_MEMO = 'CREATE_MEMO'
export const UPDATE_MEMO = 'UPDATE_MEMO'
export const DELETE_MEMO = 'DELETE_MEMO'
export const TOGGLE_SELECT_MEMO = 'TOGGLE_SELECT_MEMO'

export const localCreateMemo = (title, body, modifiedAt) => (
  { type: CREATE_MEMO, title, body, modifiedAt }
)

export const localUpdateMemo = (id, title, body, modifiedAt) => (
  { type: UPDATE_MEMO, id, title, body, modifiedAt }
)

export const localDeleteMemo = (id) => ({ type: DELETE_MEMO, id })
export const toggleSelectMemo = (id) => ({ type: TOGGLE_SELECT_MEMO, id })

/* Async action creators */
export const createMemo = (title, body) => {
  return (dispatch) => {
    modifiedAt = Date.now()
    dispatch(localCreateMemo(title, body, modifiedAt))
    fetch('/memo', {
      method: 'POST',
      body: JSON.stringify({ title, body, modifiedAt })
    })
  }
}

export const updateMemo = (id, title, body) => {
  return (dispatch) => {
    modifiedAt = Date.now()
    dispatch(localCreateMemo(id, title, body, modifiedAt))
    fetch(`/memo/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, title, body, modifiedAt })
    })
  }
}

export const deleteMemo = (id) => {
  return (dispatch) => {
    dispatch(localDeleteMemo(id))
    fetch(`/memo/${id}`, { method: 'DELETE' })
  }
}


/*
 * Actions on Memos
 */
export const ADD_LABEL_TO_MEMOS = 'ADD_LABEL_TO_MEMOS'
export const REMOVE_LABEL_TO_MEMOS = 'REMOVE_LABEL_TO_MEMOS'

export const localAddLabelToMemos = (labelId) => (
  { type: ADD_LABEL_TO_MEMOS, labelId }
)

export const localRemoveLabelToMemos = (labelId) => (
  { type: REMOVE_LABEL_TO_MEMOS, labelId }
)

export const addLabelToMemos = (labelId, memoIds) => {
  return (dispatch) => {
    localAddLabelToMemos(labelId)
    fetch(`/label/${labelId}/memos`, {
      method: 'POST',
      body: { labelId, memoIds }
    })
  }
}

export const addLabelToMemos = (labelId, memoIds) => {
  return (dispatch) => {
    localRemoveLabelToMemos(labelId)
    fetch(`/label/${labelId}/memos`, {
      method: 'DELETE',
      body: { memoIds }
    })
  }
}
