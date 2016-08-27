import tape from 'tape'
import * as actions from '../actions'

const id = 1
const ids = [1]
const labelId = 1
const memoIds = []
const label = { name: "name", memoIds: [] }
const memo = { title: "memo", body: "abc", modifiedAt: Date.now(), labelIds: []}

export default tape("action creators test", (t) => {
  t.plan(13)

  t.deepEqual(
    actions.populate({ memos: [], labels: []}),
    { type: actions.POPULATE, memos: [], labels: [] },
    'populate'
  )

  t.deepEqual(
    actions.localCreateLabel({ id, label }),
    { type: actions.CREATE_LABEL, id, label},
    'create label'
  )

  t.deepEqual(
    actions.localUpdateLabel({ id, label }),
    { type: actions.UPDATE_LABEL, id, label},
    'update label'
  )

  t.deepEqual(
    actions.localDeleteLabel({ id }),
    { type: actions.DELETE_LABEL, id },
    'delete label'
  )

  t.deepEqual(
    actions.localCreateMemo({ id, memo, labelId }),
    { type: actions.CREATE_MEMO, id, memo, labelId},
    'create memo'
  )

  t.deepEqual(
    actions.localUpdateMemo({ id, memo }),
    { type: actions.UPDATE_MEMO, id, memo},
    'update memo'
  )

  t.deepEqual(
    actions.localDeleteMemo({ id }),
    { type: actions.DELETE_MEMO, id },
    'delete memo'
  )

  t.deepEqual(
    actions.localDeleteMemos({ ids }),
    { type: actions.DELETE_MEMOS, ids },
    'delete memos'
  )

  t.deepEqual(
    actions.toggleCheckMemo({ id }),
    { type: actions.TOGGLE_CHECK_MEMO, id },
    'toggle check memo'
  )

  t.deepEqual(
    actions.checkMemos({ ids }),
    { type: actions.CHECK_MEMOS, ids },
    'check memos'
  )

  t.deepEqual(
    actions.uncheckAllMemos(),
    { type: actions.UNCHECK_ALL_MEMOS },
    'uncheck all memos'
  )

  t.deepEqual(
    actions.localAddLabelToMemos({ id, label, memoIds }),
    { type: actions.ADD_LABEL_TO_MEMOS, id, label, memoIds },
    'add label to memos'
  )

  t.deepEqual(
    actions.localRemoveLabelFromMemos({ id, label, memoIds }),
    { type: actions.REMOVE_LABEL_FROM_MEMOS, id, label, memoIds },
    'remove label from memos'
  )
})
