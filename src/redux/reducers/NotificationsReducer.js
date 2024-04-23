import {
  LOAD_NOTIFICATIONS_LIST,
  RESET_NOTIFICATIONS_LIST,
  SET_NOTIFICATION_LOADING
} from '../../constants/NotificationTypeConstants'

const initialState = {
  notifications: [],
  pageLimit: null,
  isLoaded: false,
  isLoading: false,
  canLoadMore: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS_LIST: {
      return {
        ...state,
        notifications: action.append
          ? [...state.notifications, ...action.notifications]
          : action.notifications,
        pageLimit: action.pageLimit,
        isLoaded: true,
        isLoading: false,
        canLoadMore: action.canLoadMore
      }
    }
    case SET_NOTIFICATION_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading || state.isLoading,
        isLoaded: action.isLoaded || state.isLoaded
      }
    }
    case RESET_NOTIFICATIONS_LIST: {
      return {
        ...initialState
      }
    }
    default:
      return state
  }
}

export default reducer
