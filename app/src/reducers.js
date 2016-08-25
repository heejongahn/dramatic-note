import { POPULATE, CREATE_LABEL, UPDATE_LABEL, DELETE_LABEL,
  CREATE_MEMO, UPDATE_MEMO, DELETE_MEMO, DELETE_MEMOS,
  TOGGLE_SELECT_MEMO, SELECT_MEMOS, UNSELECT_ALL_MEMOS,
  ADD_LABEL_TO_MEMOS, REMOVE_LABEL_FROM_MEMOS } from './actions'

import 'whatwg-fetch'

const initialState = {
  labels: {},
  memos: {},
  checkedMemoIds: []
}

const collectObject = (first, second) => {
  return Object.assign({}, first, second)
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case POPULATE:
      return {
        memos: action.memos,
        labels: action.labels,
        checkedMemoIds: []
      }

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
      return collectObject(
        state,
        {
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
      )

    case CREATE_MEMO:
      return collectObject(
        state,
        {
          memos: collectObject(
            state.memos,
            { [action.id]: action.memo }
          ),
          labels: (action.labelId == "all")
            ? state.labels
            : Object.assign({}, state.labels,
              { [action.labelId] : collectObject(state.labels[action.labelId],
                { memoIds: state.labels[action.labelId].memoIds.concat([action.id]) })
              }
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
      return collectObject(
        state,
        collectObject(
          {
          memos: Object.assign({}, ...Object.keys(state.memos)
            .filter(id => id != action.id)
            .map(id => ({ [id]: state.memos[id] }))
          ),

          labels: Object.assign({}, ...Object.keys(state.labels)
            .map(id => ({ [id]: collectObject(
              state.labels[id],
              {
                memoIds:
                  state.labels[id].memoIds
                  .filter(id => id != action.id) }
            )})
          ))
        }
        )
      )

    case DELETE_MEMOS:
      return collectObject(
        state,
        collectObject(
          {
          memos: Object.assign({}, ...Object.keys(state.memos)
            .filter(id => !(action.ids.includes(id)))
            .map(id => ({ [id]: state.memos[id] }))
          ),

          labels: Object.assign({}, ...Object.keys(state.labels)
            .map(id => ({ [id]: collectObject(
              state.labels[id],
              {
                memoIds:
                  state.labels[id].memoIds
                  .filter(id => !(action.ids.includes(id)))
              }
            )})
          ))
          }
        )
      )

    case TOGGLE_SELECT_MEMO:
      return collectObject(
        state,
        {
          checkedMemoIds: (state.checkedMemoIds.includes(action.id)
          ? state.checkedMemoIds.filter(id => id != action.id)
          : state.checkedMemoIds.concat([action.id]))
        }
      )

    case SELECT_MEMOS:
      return collectObject(
        state,
        { checkedMemoIds: action.ids }
      )

    case UNSELECT_ALL_MEMOS:
      return collectObject(
        state,
        { checkedMemoIds: [] }
      )

    case ADD_LABEL_TO_MEMOS:
      return collectObject(
        state,
        {
          labels: collectObject(
            state.labels,
            { [action.id]: action.label }),

          memos: Object.assign({},
            ...Object.keys(state.memos)
            .map(id => (
              { [id]: (action.memoIds.includes(id))
                      ? collectObject(state.memos[id],
                        { labelIds: state.memos[id].labelIds.concat([action.id]) })
                      : state.memos[id] }))
          )
        }
      )

    case REMOVE_LABEL_FROM_MEMOS:
      return collectObject(
        state,
        {
          labels: collectObject(
            state.labels,
            { [action.id]: action.label }),

          memos: Object.assign({},
            ...Object.keys(state.memos)
            .map(id => (
              { [id]: (action.memoIds.includes(id))
                      ? collectObject(state.memos[id],
                        { labelIds: state.memos[id].labelIds.filter(id => id != action.id) })
                      : state.memos[id] }))
          )
        })

    default:
      return state
  }
}

export default reducers
