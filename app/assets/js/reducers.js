import { POPULATE, CREATE_LABEL, UPDATE_LABEL, DELETE_LABEL,
  CREATE_MEMO, UPDATE_MEMO, DELETE_MEMO, TOGGLE_SELECTE_MEMO,
  ADD_LABELS_TO_MEMOS, REMOVE_LABELS_TO_MEMOS } from './actions'

const initialState = {
  labels: [],
  memos: []
}

const collectObjects = (objects) => {
  return Object.assign({}, ...objects)
}

const reducer(state = initialState, action) {
  switch (action.type) {
    case POPULATE:
      const memos = action.memos
      const labels = action.labels

      return { memos, labels }

    case CREATE_LABEL:
      const newLables = collectObjects(state.labels, { action.id: action.label })
      return collectObjects(state, { labels: newLabels })

    case UPDATE_LABEL:
      const newLabels = collecObjects(state.labels, { action.id: actoin.label })
      return collectObjects(state, { labels: newLabels })

    case DELETE_LABEL:
      const newLabels = Object.keys(state.labels)
        .filter(id => id != action.id)
        .map(id => state.labels[id])

      const newMemos = Object.keys(state.memos).map(id => {
        const memo = state.memos[id]
        const newLabelIds = memo.labelIds.filter(id => id != action.id)

        return collectObjects(memo, { labelIds: newLabelIds })
      })

      return collectObjects(state, { labels: newLabels, memos: newMemos })

    case CREATE_MEMO:
      const newMemos = collectObject(state.memos, { action.id: action.memo })
      return collectObjects(state, { memos: newMemos })

    case UPDATE_MEMO:
      const newMemos = collectObject(state.memos, { action.id: action.memo })
      return collectObjects(state, { memos: newMemos })

    case DELETE_MEMO:
      const newMemos = Object.keys(state.memos)
        .filter(id => id != action.id)
        .map(id => state.memos[id])

      const newLabels = Object.keys(state.labels).map(id => {
        const label = state.labels[id]
        const newMemoIds = label.memoIds.filter(id => id != action.id)

        return collectObjects(state, { memoIds: newMemoIds })
      })

      return collectObjects(state, { label: newLabels, memos: newMemos })

    case TOGGLE_SELECT_MEMO:
      const memo = state.memos[action.id]
      const newMemos = collectObject(state.memos, {
        action.id: {
            title: memo.title,
            body: memo.body,
            selected: !memo.selected,
            modifiedAt: memo.modifiedAt,
            labelIds: memo.labelIds
        }
      }

      return collectObjects(state, { memos: newMemos })

    case ADD_LABEL_TO_MEMOS:
      const newLabels = collectObject(state.labels, { action.id: action.label })

      const newMemos = Object.keys(state.memos).map(id => {
        if (action.label.memoIds.includes(id)) {
          const memo = state.memos[id]
          const newLabelIds = memo.labelIds.filter(id => id != action.id)
          newLabelIds.push(action.id)

          return collectObjects(memo, { labelIds: newLabelIds })
        } else {
          return state.memos[id]
        }
      })

      return collectObjects(state, { labels: newLabels, memos: newMemos })

    case REMOVE_LABEL_FROM_MEMOS:
      const newLabels = collectObject(state.labels, { action.id: action.label })

      const newMemos = Object.keys(state.memos).map(id => {
        if (action.label.memoIds.includes(id)) {
          const memo = state.memos[id]
          const newLabelIds = memo.labelIds.filter(id => id != action.id)

          return collectObjects(memo, { labelIds: newLabelIds })
        } else {
          return state.memos[id]
        }
      })

      return collectObjects(state, { labels: newLabels, memos: newMemos })

    default:
      return state
