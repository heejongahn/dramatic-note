import { POPULATE, CREATE_LABEL, UPDATE_LABEL, DELETE_LABEL,
  CREATE_MEMO, UPDATE_MEMO, DELETE_MEMO, TOGGLE_SELECT_MEMO,
  ADD_LABEL_TO_MEMOS, REMOVE_LABEL_FROM_MEMOS } from './actions'

import 'whatwg-fetch'

const initialState = {
  labels: {},
  memos: {}
}

const collectObjects = (objects) => {
  return Object.assign({}, ...objects)
}

const reducers = (state = initialState, action) => {
  let memos, labels, newLabels, newMemos, newMemoIds, memo, label
  switch (action.type) {
    case POPULATE:
      memos = action.memos
      labels = action.labels

      return ({ memos, labels })

    case CREATE_LABEL:
      newLables = collectObjects(
        state.labels,
        { [action.id]: action.label }
      )

      return collectObjects(state, ({ labels: newLabels }))

    case UPDATE_LABEL:
      newLabels = collectObjects(state.labels,
        { [action.id] : action.label }
      )

      return collectObjects(state, ({ labels: newLabels }))

    case DELETE_LABEL:
      newLabels = Object.keys(state.labels)
        .filter(id => id != action.id)
        .map(id => state.labels[id])

      newMemos = Object.keys(state.memos).map(id => {
        memo = state.memos[id]
        newLabelIds = memo.labelIds.filter(id => id != action.id)

        return collectObjects(memo, ({ labelIds: newLabelIds }))
      })

      return collectObjects(state, ({ labels: newLabels, memos: newMemos }))

    case CREATE_MEMO:
      newMemos = collectObject(state.memos, { [action.id]: action.memo })
      return collectObjects(state, { memos: newMemos })

    case UPDATE_MEMO:
      newMemos = collectObject(state.memos, { [action.id]: action.memo })
      return collectObjects(state, { memos: newMemos })

    case DELETE_MEMO:
      newMemos = Object.keys(state.memos)
        .filter(id => id != action.id)
        .map(id => state.memos[id])

      newLabels = Object.keys(state.labels).map(id => {
        label = state.labels[id]
        newMemoIds = label.memoIds.filter(id => id != action.id)

        return collectObjects(state, { memoIds: newMemoIds })
      })

      return collectObjects(state, { label: newLabels, memos: newMemos })

    case TOGGLE_SELECT_MEMO:
      memo = state.memos[action.id]
      newMemos = collectObject(state.memos, {
        [action.id]: {
            title: memo.title,
            body: memo.body,
            selected: !memo.selected,
            modifiedAt: memo.modifiedAt,
            labelIds: memo.labelIds
        }
      })

      return collectObjects(state, { memos: newMemos })

    case ADD_LABEL_TO_MEMOS:
      newLabels = collectObject(state.labels,
        { [action.id]: action.label })

      newMemos = Object.keys(state.memos).map(id => {
        if (action.label.memoIds.includes(id)) {
          memo = state.memos[id]
          newLabelIds = memo.labelIds.filter(id => id != action.id)
          newLabelIds.push(action.id)

          return collectObjects(memo, { labelIds: newLabelIds })
        } else {
          return state.memos[id]
        }
      })

      return collectObjects(state, { labels: newLabels, memos: newMemos })

    case REMOVE_LABEL_FROM_MEMOS:
      newLabels = collectObject(state.labels,
        { [action.id]: action.label })

      newMemos = Object.keys(state.memos).map(id => {
        if (action.label.memoIds.includes(id)) {
          memo = state.memos[id]
          newLabelIds = memo.labelIds.filter(id => id != action.id)

          return collectObjects(memo, { labelIds: newLabelIds })
        } else {
          return state.memos[id]
        }
      })

      return collectObjects(state, { labels: newLabels, memos: newMemos })

    default:
      return state
  }
}

export default reducers
