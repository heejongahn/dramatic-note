/*
 * General api call and dispatch logic
 */

const apiCallAndDispatch = (url, method, body, actionCreator, dispatch) => {
  const headers = new Headers({ "Content-type": "application/json" })

  return fetch(url, { method, headers, body})
  .then(response => response.json())
  .then(result => {
    dispatch(actionCreator(result['result']))
  })
}

/*
 * Initial sync with db
 */

export const syncWithDB = () => {
  return (dispatch) => {
    apiCallAndDispatch(
      '/all_data',
      'GET',
      null,
      populate,
      dispatch
    )
  }
}


export const POPULATE = 'POPULATE'
export const populate = ({ memos, labels }) => (
  { type: POPULATE, memos, labels }
)


/*
 * Actions on Label
 */
export const CREATE_LABEL = 'CREATE_LABEL'
export const UPDATE_LABEL = 'UPDATE_LABEL'
export const DELETE_LABEL = 'DELETE_LABEL'

export const localCreateLabel = ({ id, label }) => (
  { type: CREATE_LABEL, id, label })

export const localUpdateLabel = ({ id, label }) => (
  { type: UPDATE_LABEL, id, label }
)

export const localDeleteLabel = ({ id }) => (
  { type: DELETE_LABEL, id })

/* Async action creators */
export const createLabel = (name) => {
  return (dispatch) => {
    apiCallAndDispatch(
      '/label',
      'POST',
      JSON.stringify({ name }),
      localCreateLabel,
      dispatch
    )
  }
}

export const updateLabel = (id, name) => {
  return (dispatch) => {
    apiCallAndDispatch(
      `/label/${id}`,
      'PUT',
      JSON.stringify({ name }),
      localUpdateLabel,
      dispatch
    )
  }
}

export const deleteLabel = (id) => {
  return (dispatch) => {
    apiCallAndDispatch(
      `/label/${id}`,
      'DELETE',
      null,
      localDeleteLabel,
      dispatch
    )
  }
}

/*
 * Actions on Memo
 */
export const CREATE_MEMO = 'CREATE_MEMO'
export const UPDATE_MEMO = 'UPDATE_MEMO'
export const DELETE_MEMO = 'DELETE_MEMO'
export const DELETE_MEMOS = 'DELETE_MEMOS'
export const TOGGLE_SELECT_MEMO = 'TOGGLE_SELECT_MEMO'
export const TOGGLE_SELECT_ALL = 'TOGGLE_SELECT_ALL'
export const SELECT_MEMOS = 'SELECT_MEMOS'
export const UNSELECT_ALL_MEMOS = 'UNSELECT_ALL_MEMOS'

export const localCreateMemo = ({ id, memo, labelId }) => (
  { type: CREATE_MEMO, id, memo, labelId })

export const localUpdateMemo = ({ id, memo }) => (
  { type: UPDATE_MEMO, id, memo }
)

export const localDeleteMemo = ({ id }) => (
  { type: DELETE_MEMO, id })

export const localDeleteMemos = ({ ids }) => (
  { type: DELETE_MEMOS, ids })

export const toggleSelectMemo = ({ id }) => (
  { type: TOGGLE_SELECT_MEMO, id })

export const selectMemos = (ids) => (
  { type: SELECT_MEMOS, ids }
)

export const unselectAllMemos = () => (
  { type: UNSELECT_ALL_MEMOS }
)

/* Async action creators */
export const createMemo = (title, body, labelId) => {
  return (dispatch) => {
    const modifiedAt = Date.now()
    apiCallAndDispatch(
      '/memo',
      'POST',
      JSON.stringify({ title, body, modifiedAt, labelId }),
      localCreateMemo,
      dispatch
    )
  }
}

export const updateMemo = (id, title, body) => {
  return (dispatch) => {
    const modifiedAt = Date.now()
    apiCallAndDispatch(
      `/memo/${id}`,
      'PUT',
      JSON.stringify({ title, body, modifiedAt }),
      localUpdateMemo,
      dispatch
    )
  }
}

export const deleteMemo = (id) => {
  return (dispatch) => {
    apiCallAndDispatch(
      `/memo/${id}`,
      'DELETE',
      null,
      localDeleteMemo,
      dispatch
    )
  }
}

export const deleteMemos = (ids) => {
  return (dispatch) => {
    apiCallAndDispatch(
      `/memos`,
      'DELETE',
      JSON.stringify({ ids }),
      localDeleteMemos,
      dispatch
    )
  }
}

/*
 * Actions on Memos
 */
export const ADD_LABEL_TO_MEMOS = 'ADD_LABEL_TO_MEMOS'
export const REMOVE_LABEL_FROM_MEMOS = 'REMOVE_LABEL_FROM_MEMOS'

export const localAddLabelToMemos = ({ id, label, memoIds }) => (
  { type: ADD_LABEL_TO_MEMOS, id, label, memoIds }
)

export const localRemoveLabelFromMemos = ({ id, label, memoIds }) => (
  { type: REMOVE_LABEL_FROM_MEMOS, id, label, memoIds }
)

export const addLabelToMemos = (labelId, memoIds) => {
  return (dispatch) => {
    apiCallAndDispatch(
      `/label/${labelId}/memos`,
      'POST',
      JSON.stringify({ memoIds }),
      localAddLabelToMemos,
      dispatch
    )
  }
}

export const removeLabelFromMemos = (labelId, memoIds) => {
  return (dispatch) => {
    apiCallAndDispatch(
      `/label/${labelId}/memos`,
      'DELETE',
      JSON.stringify({ memoIds }),
      localRemoveLabelFromMemos,
      dispatch
    )
  }
}
