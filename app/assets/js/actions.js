/* Actions on Label */
export const CREATE_LABEL = 'CREATE_LABEL'
export const UPDATE_LABEL = 'UPDATE_LABEL'
export const SELECT_LABEL = 'SELECT_LABEL'

export const createLabel = (name) => { type: CREATE_LABEL, name }
export const updateLabel = (id, name) => { type: UPDATE_LABEL, id, name }
export const selectLabel = (id) => { type: SELECT_LABEL, id }

/* Actions on Memo */
export const CREATE_MEMO = 'CREATE_MEMO'
export const UPDATE_MEMO = 'UPDATE_MEMO'
export const DELETE_MEMO = 'DELETE_MEMO'
export const TOGGLE_SELECT_MEMO = 'TOGGLE_SELECT_MEMO'

export const createMemo = (title, body) => { type: CREATE_MEMO, title, body }
export const updateMemo = (id, title, body) => { type: UPDATE_MEMO, id, title, body }
export const deleteMemo = (id) => { type: DELETE_MEMO, id }
export const toggleSelectMemo = (id) => { type: TOGGLE_SELECT_MEMO, id }

/* Actions on Memos */
export const ADD_LABEL = 'ADD_LABEL'
export const REMOVE_LABEL = 'REMOVE_LABEL'

export const addLabel = (id) => { type: ADD_LABEL, id }
export const removeLabel = (id) => { type: REMOVE_LABEL, id }
