import tape from 'tape'
import * as actions from '../actions'
import reducers from '../reducers'

const id = "1"
const ids = ["1"]
const labelId = "1"
const memoIds = ["1"]

const label = { name: "name", memoIds: [] }
const newLabel = { name: "new name", memoIds: [] }
const labelWithMemo = { name: "name", memoIds: ids }

const memo = { title: "memo",
  body: "abc", modifiedAt: Date.now(), labelIds: []}

const newMemo = { title: "new memo",
  body: "abc", modifiedAt: Date.now(), labelIds: []}

const memoWithLabel = { title: "memo",
  body: "abc", modifiedAt: Date.now(), labelIds: ids }

const memos = {}
const labels = {}
const checkedMemoIds = []

const initialState = { memos, labels, checkedMemoIds }

const populatedState = {
  memos: { [id]: memo },
  labels: { [id]: label },
  checkedMemoIds }

const memoCreatedState = {
  memos: { [id]: memo },
  labels: { [id]: labelWithMemo },
  checkedMemoIds }

const memoState = {
  memos: { [id]: memo },
  labels, checkedMemoIds }

const newMemoState = {
  memos: { [id]: newMemo },
  labels, checkedMemoIds }

const labelState =  { labels: { [id]: label },
  memos, checkedMemoIds }

const newLabelState =  { labels: { [id]: newLabel },
  memos, checkedMemoIds }

const checkedState = {
  memos: { [id]: memo },
  labels: { [id]: label },
  checkedMemoIds: [id]
}

const labelAddedState = {
  memos: { [id]: memoWithLabel },
  labels: { [id]: labelWithMemo },
  checkedMemoIds: [id]
}

tape('reducers test', (t) => {
  t.plan(13)

  const populate = { type: actions.POPULATE, memos: { [id]: memo }, labels: { [id]: label } }
  t.deepEqual(
    reducers(initialState, populate),
    populatedState,
    'popluate'
  )

  const createLabel =  { type: actions.CREATE_LABEL, id, label }
  t.deepEqual(
    reducers(initialState, createLabel),
    labelState,
    'create label'
  )

  const updateLabel = { type: actions.UPDATE_LABEL, id, label: newLabel }
  t.deepEqual(
    reducers(labelState, updateLabel),
    newLabelState,
    'update label'
  )

  const deleteLabel =  { type: actions.DELETE_LABEL, id }
  t.deepEqual(
    reducers(labelState, deleteLabel),
    initialState,
    'delete label'
  )

  const createMemo =  { type: actions.CREATE_MEMO, id, memo, labelId }
  t.deepEqual(
    reducers(labelState, createMemo),
    memoCreatedState,
    'create memo'
  )

  const updateMemo =  { type: actions.UPDATE_MEMO, id, memo: newMemo }
  t.deepEqual(
    reducers(memoState, updateMemo),
    newMemoState,
    'update memo'
  )

  const deleteMemo =  { type: actions.DELETE_MEMO, id }
  t.deepEqual(
    reducers(memoState, deleteMemo),
    initialState,
    'delete memo'
  )

  const deleteMemos =  { type: actions.DELETE_MEMOS, ids: ids }
  t.deepEqual(
    reducers(memoState, deleteMemos),
    initialState,
    'delete memos'
  )

  const toggleCheckMemo =  { type: actions.TOGGLE_CHECK_MEMO, id }
  t.deepEqual(
    reducers(populatedState, toggleCheckMemo),
    checkedState,
    'toggle check memo'
  )

  const checkMemos =  { type: actions.CHECK_MEMOS, ids }
  t.deepEqual(
    reducers(populatedState, checkMemos),
    checkedState,
    'check memos'
  )

  const uncheckAllMemos =  { type: actions.UNCHECK_ALL_MEMOS }
  t.deepEqual(
    reducers(checkedState, uncheckAllMemos),
    populatedState,
    'uncheck all memos'
  )

  const addLabelToMemos =  { type: actions.ADD_LABEL_TO_MEMOS, id, label: labelWithMemo, memoIds }
  t.deepEqual(
    reducers(checkedState, addLabelToMemos),
    labelAddedState,
    'add label to memos'
  )

  const removeLabelFromMemos =  { type: actions.REMOVE_LABEL_FROM_MEMOS, id, label, memoIds }
  t.deepEqual(
    reducers(labelAddedState, removeLabelFromMemos),
    checkedState,
    'remove label from memos'
  )
})
