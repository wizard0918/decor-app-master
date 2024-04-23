import { USER_INVALID_SESSION_INVALID } from '../../constants/AuthActionsConstants'
import {
  INSPIRATION_GET,
  INSPIRATION_GET_IDS,
  INSPIRATION_REMOVED,
  INSPIRATION_SAVED
} from '../../constants/SaveInspirationConstants'

const initialState = {
  savedList: [],
  savedIds: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INSPIRATION_GET: {
      return {
        ...state,
        savedList: action.data ? action.data : {},
        savedProductIds: action.productIds
      }
    }
    case INSPIRATION_GET_IDS: {
      return {
        ...state,
        savedIds: action.itemIds
      }
    }
    case INSPIRATION_SAVED: {
      if (typeof state.savedIds !== 'undefined') {
        state.savedIds.push(action.id)
      } else {
        state.savedIds = [action.id]
      }

      return {
        ...state,
        savedIds: [...state.savedIds]
      }
    }
    case INSPIRATION_REMOVED: {
      state.savedIds = state.savedIds.filter(e => e !== action.id)

      return {
        ...state,
        savedList: [...state.savedIds]
      }
    }
    case USER_INVALID_SESSION_INVALID: {
      return initialState
    }

    default:
      return state
  }
}
