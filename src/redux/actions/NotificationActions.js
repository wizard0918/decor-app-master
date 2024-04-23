import {
  LOAD_NOTIFICATIONS_LIST,
  RESET_NOTIFICATIONS_LIST,
  SET_NOTIFICATION_LOADING
} from '../../constants/NotificationTypeConstants'
import { loadMe } from '../../profile/store/profileReducer'
import { parseHeaders } from '../../util/fetchUtil'

export const loadNotifications = (types, globalTypes, skip = 0) => {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      types,
      globalTypes,
      skip
    })
  }

  return async (dispatch, state) => {
    if (state().auth.isAuthenticated === false) {
      return
    }

    try {
      const isLoadingMore = skip > 0

      dispatch(setNotificationsLoading(true, isLoadingMore))
      const response = await fetch(process.env.REACT_APP_GET_NOTIFICATIONS, appendant)
      const {
        result: { notifications, pageLimit }
      } = await response.json()
      const canLoadMore = notifications.length === pageLimit
      dispatch(getNotificationObj(notifications, pageLimit, isLoadingMore, canLoadMore))
    } catch (error) {}
  }
}

export const loadRewardNotifications = (skip = 0) => {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      skip
    })
  }

  return async (dispatch, state) => {
    if (state().auth.isAuthenticated === false) {
      return
    }

    try {
      const isLoadingMore = skip > 0

      dispatch(setNotificationsLoading(true, isLoadingMore))
      const response = await fetch(process.env.REACT_APP_GET_REWARD_NOTIFICATIONS, appendant)
      const {
        result: { notifications, pageLimit }
      } = await response.json()
      const canLoadMore = notifications.length === pageLimit
      dispatch(getNotificationObj(notifications, pageLimit, isLoadingMore, canLoadMore))
    } catch (error) {}
  }
}

export const resetUnreadCount = (tabName = 'you', history) => {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      tabName
    })
  }

  return async (dispatch, state) => {
    if (state().auth.isAuthenticated === false) {
      return
    }

    try {
      await fetch(process.env.REACT_APP_NOTIFICATIONS_RESET, appendant)
      dispatch(loadMe({ history }))
    } catch (error) {}
  }
}

export const resetNotifications = () => ({
  type: RESET_NOTIFICATIONS_LIST
})

export const setNotificationsLoading = (isLoading, isLoaded) => ({
  type: SET_NOTIFICATION_LOADING,
  isLoading,
  isLoaded
})

export const getNotificationObj = (notifications, pageLimit, append, canLoadMore) => {
  return {
    type: LOAD_NOTIFICATIONS_LIST,
    notifications: notifications,
    pageLimit,
    append,
    canLoadMore
  }
}
