import { POPULATE, CREATE_LABEL, UPDATE_LABEL, DELETE_LABEL,
  CREATE_MEMO, UPDATE_MEMO, DELETE_MEMO,
  TOGGLE_SELECT_MEMO, SELECT_ALL_MEMOS, UNSELECT_ALL_MEMOS,
  ADD_LABEL_TO_MEMOS, REMOVE_LABEL_FROM_MEMOS } from './actions'

import 'whatwg-fetch'

const initialState = {
  labels: {},
  memos: {}
}

const collectObject = (first, second) => {
  return Object.assign({}, first, second)
}

const reducers = (state = initialState, action) => {
  let memos, labels, newLabels, newMemos, newMemoIds, memo, label

  switch (action.type) {
    case POPULATE:
      memos = action.memos
      labels = action.labels

      return ({ memos, labels })

    case CREATE_LABEL:
      return collectObject(
        state,
        {
          labels: collectObject(
            state.labels,
            { [action.id]: action.label}
          )
        }
      )

    case UPDATE_LABEL:
      return collectObject(
        state,
        {
          labels: collectObject(
            state.labels,
            { [action.id]: action.label}
          )
        }
      )

    case DELETE_LABEL:
      return {
        labels: Object.assign({}, ...Object.keys(state.labels)
          .filter(id => id != action.id)
          .map(id => ({ [id]: state.labels[id]}))
          ),

        memos: Object.assign({}, ...Object.keys(state.memos)
          .map(id => ({ [id]: collectObject(
            state.memos[i],
            { labelids: state.memos[i].labelIds.filter(id => id != action.id) }
          )})
        ))
      }

    case CREATE_MEMO:
      return collectObject(
        state,
        {
          memos: collectObject(
            state.memos,
            { [action.id]: action.memo }
          )
        }
      )

    case UPDATE_MEMO:
      return collectObject(
        state,
        {
          memos: collectObject(
            state.memos,
            { [action.id]: action.memo }
          )
        }
      )

    case DELETE_MEMO:
      return {
        memos: Object.assign({}, ...Object.keys(state.memos)
          .filter(id => id != action.id)
          .map(id => ({ [id]: state.memos[id] }))
        ),

        labels: Object.assign({}, ...Object.keys(state.labels)
          .map(id => ({ [id]: collectObject(
            state.labels[id],
            { memoIds: state.labels[id].memoIds.filter(id => id != action.id) }
          )})
        ))
      }

    case TOGGLE_SELECT_MEMO:
      return collectObject(
        state,
        {
          memos: collectObject(
            state.memos,
            {
              [action.id]: collectObject(
                state.memos[action.id],
                { checked: !(state.memos[action.id].selected) }
              )
            })
        }
      )

    case SELECT_ALL_MEMOS:
      return collectObject(
        state,
        {
          memos: Object.assign({},
            ...Object.keys(state.memos).map(id =>
              ({ [id]: collectObject(state.memos[id], { checked: true }) })
            )
          )
        }
      )

    case UNSELECT_ALL_MEMOS:
      return collectObject(
        state,
        {
          memos: Object.assign({},
            ...Object.keys(state.memos).map(id =>
              ({ [id]: collectObject(state.memos[id], { checked: false }) })
            )
          )
        }
      )

    case ADD_LABEL_TO_MEMOS:
      return {
        labels: collectObject(
          state.labels,
          { [action.id]: action }),

        memos: Object.keys(state.memos)
        .map(id => {
          if (action.memoIds.includes(id)) {
            return collectObject(
              state.memos[id],
              { labelIds: state.memos[id].labelIds.concat([action.id]) }
            )
          } else {
            return state.memos[id]
          }
        })
      }

    case REMOVE_LABEL_FROM_MEMOS:
      return {
        labels: collectObject(
          state.labels,
          { [action.id]: action }),

        memos: Object.keys(state.memos)
        .map(id => {
          if (action.memoIds.includes(id)) {
            return collectObject(
              state.memos[id],
              { labelIds: state.memos[id].labelIds.filter(id => id != action.id)}
            )
          } else {
            return state.memos[id]
          }
        })
      }

    default:
      return state
  }
}

export default reducers
