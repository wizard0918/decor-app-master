import classNames from 'classnames'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import noNotificationsImg from '../../../assets/No-notification.svg'
import { NOTIFICATION_SECTIONS } from '../../../constants/NotificationTypeConstants'
import useOutsideAlerter from '../../../hooks/useOutsideAlerter'
import {
  loadNotifications,
  loadRewardNotifications,
  resetNotifications,
  resetUnreadCount
} from '../../../redux/actions/NotificationActions'
import { NotificationResolver } from '../../../util/notifications'
import { LoadingIndicator2 } from '../../feeds/LoadingIndicator'
import {
  BackArrow,
  BackArrowButton,
  EmptyState,
  NotificationBlock,
  NotificationsHeaderMobile,
  NotificationsList,
  NotificationsMenuContainer,
  NotificationTab,
  NotificationTabs,
  TabContent
} from './NotificationsMenu.styles'

const tabsList = [
  {
    type: 'you',
    name: 'You',
    filters: NOTIFICATION_SECTIONS.YOU
  },
  {
    type: 'rewards',
    name: 'Rewards',
    filters: NOTIFICATION_SECTIONS.REWARDS
  },
  {
    type: 'official',
    name: 'Official',
    filters: NOTIFICATION_SECTIONS.OFFICIAL
  },
  {
    type: 'Following',
    name: 'Following',
    filters: NOTIFICATION_SECTIONS.FOLLOWING
  }
]

const NotificationsMenu = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { notifications, isLoaded, isLoading, canLoadMore } = useSelector(
    state => state.notifications
  )
  const [activeTab, setActiveTab] = useState(tabsList[0])
  const currentFilter = useMemo(() => activeTab.filters || NOTIFICATION_SECTIONS.YOU, [activeTab])
  const { close } = props
  const scrollListRef = useRef(null)
  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, close)

  useEffect(() => {
    if (!isLoaded && !isLoading) {
      if (currentFilter === NOTIFICATION_SECTIONS.REWARDS) {
        dispatch(loadRewardNotifications())

        return
      }

      dispatch(loadNotifications(currentFilter.types, currentFilter.globalTypes))
    }
  }, [currentFilter, notifications, isLoaded, isLoading, dispatch])

  let notificationsList = notifications || []
  const notificationsCount = notificationsList.length
  useEffect(() => {
    const ref = scrollListRef.current

    const listener = event => {
      const el = event.target

      if (
        el.scrollTop !== 0 &&
        el.scrollHeight - el.scrollTop - el.clientHeight < 100 &&
        !isLoading &&
        canLoadMore
      ) {
        if (currentFilter === NOTIFICATION_SECTIONS.REWARDS) {
          dispatch(loadRewardNotifications(notificationsCount))

          return
        }

        dispatch(
          loadNotifications(currentFilter.types, currentFilter.globalTypes, notificationsCount)
        )
      }
    }
    if (ref) ref.addEventListener('scroll', listener, false)

    return () => {
      if (ref) ref.removeEventListener('scroll', listener)
    }
  }, [scrollListRef, currentFilter, isLoading, dispatch, notificationsCount, canLoadMore])

  const handleTabChange = tab => {
    dispatch(resetNotifications())
    dispatch(resetUnreadCount(tab.type, history))
    setActiveTab(tab)
  }

  useEffect(() => {
    dispatch(resetUnreadCount(activeTab.type, history))

    return () => {
      // Remove notifications when window is closed
      dispatch(resetNotifications())
    }
  }, [activeTab, history, dispatch])

  return (
    <div ref={wrapperRef}>
      <NotificationsMenuContainer>
        <NotificationsHeaderMobile>
          <BackArrowButton onClick={close}>
            <BackArrow />
          </BackArrowButton>
          Notifications
        </NotificationsHeaderMobile>
        <NotificationTabs>
          {tabsList.map(tab => (
            <NotificationTab
              key={tab.type}
              className={classNames({
                active: activeTab === tab
              })}
            >
              <TabContent onClick={() => handleTabChange(tab)}>{tab.name}</TabContent>
            </NotificationTab>
          ))}
        </NotificationTabs>
        {notificationsList.length === 0 && isLoaded && (
          <EmptyState>
            <img src={noNotificationsImg} alt="" />
            <p>No notifications yet</p>
          </EmptyState>
        )}
        <NotificationsList ref={scrollListRef}>
          {notificationsList.map(notification => (
            <NotificationBlock key={notification.objectId}>
              <NotificationResolver onClick={close} notification={notification} />
            </NotificationBlock>
          ))}
          <li>
            <LoadingIndicator2 loading={isLoading} />
          </li>
        </NotificationsList>
      </NotificationsMenuContainer>
    </div>
  )
}

export { NotificationsMenu }
