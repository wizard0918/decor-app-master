import React from 'react'
import coinsImg from '../assets/Coins.svg'
import { BannerNotification } from '../components/notifications/BannerNotification/BannerNotification'
import SmallNotification from '../components/notifications/SmallNotification'
import { GiftImage } from '../components/notifications/SmallNotification/SmallNotification.styles'
import { ProfileImage } from '../components/profile/ProfileImage/ProfileImage'
import { COMMENT_TYPES, NOTIFICATION_TYPES } from '../constants/NotificationTypeConstants'

export const getNoitificationLink = notification => {
  switch (notification.type) {
    case NOTIFICATION_TYPES.FOLLOW:
    case NOTIFICATION_TYPES.USER_INSPIRATION_LIKE:
    case NOTIFICATION_TYPES.USER_INSPIRATION_COMMENT:
    case NOTIFICATION_TYPES.USER_INSPIRATION_COMMENT_LIKE:
    case NOTIFICATION_TYPES.USER_INSPIRATION_COMMENT_REPLY:
      return `/dm/${notification.sourceUser.objectId}`
    case NOTIFICATION_TYPES.POPULAR_FEED:
      return `/design/${notification.userInspiration.objectId}`
    case NOTIFICATION_TYPES.CHALLENGE_ENDED:
    case NOTIFICATION_TYPES.CHALLENGE_ENDED_GLOBAL:
    case NOTIFICATION_TYPES.CHALLENGE_REMINDER:
    case NOTIFICATION_TYPES.NEW_CHALLENGE_GLOBAL:
    case NOTIFICATION_TYPES.ITEM_BUNDLE_SALE_GLOBAL:
      return `https://designer.decormatters.com/challenges/${notification.designContest.objectId}`
    case NOTIFICATION_TYPES.DAILY_TASK_REWARD:
    case NOTIFICATION_TYPES.LEVEL_UP:
    case NOTIFICATION_TYPES.BADGE_REWARD:
    case NOTIFICATION_TYPES.CHALLENGE_REWARD:
      return `/dm`
    default:
      return null
  }
}

export const getNoitificationDescription = notification => {
  switch (notification.type) {
    case NOTIFICATION_TYPES.FOLLOW:
      return (
        <>
          <b>{notification.sourceUser.uniqueDisplayName || 'A new user'}</b> started following you!
        </>
      )
    case NOTIFICATION_TYPES.USER_INSPIRATION_LIKE:
      return (
        <>
          <b>{notification.sourceUser.uniqueDisplayName}</b> liked your design
        </>
      )
    case NOTIFICATION_TYPES.PUBLISHED_DESIGN:
      return (
        <>
          <b>{notification.sourceUser.uniqueDisplayName}</b> published a design!
        </>
      )
    case NOTIFICATION_TYPES.USER_INSPIRATION_COMMENT:
      switch (notification.userInspirationComment.type) {
        case COMMENT_TYPES.GIFT:
          return (
            <>
              <b>{notification.sourceUser.uniqueDisplayName}</b> sent the{' '}
              <GiftImage src={notification.userInspirationComment.vgImageUrl} alt="" /> gift for
              your design!
            </>
          )
        default:
          return (
            <>
              <b>{notification.sourceUser.uniqueDisplayName}</b> left a comment
            </>
          )
      }
    case NOTIFICATION_TYPES.USER_INSPIRATION_COMMENT_LIKE:
      return (
        <>
          <b>{notification.sourceUser.uniqueDisplayName}</b> liked your comment!
        </>
      )
    case NOTIFICATION_TYPES.USER_INSPIRATION_COMMENT_REPLY:
      return (
        <>
          <b>{notification.sourceUser.uniqueDisplayName}</b> wrote:{' '}
          {notification.userInspirationComment.text}
        </>
      )
    case NOTIFICATION_TYPES.LEVEL_UP:
    case NOTIFICATION_TYPES.BADGE_REWARD:
    case NOTIFICATION_TYPES.DAILY_TASK_REWARD:
    case NOTIFICATION_TYPES.CHALLENGE_REWARD:
    case NOTIFICATION_TYPES.WELCOME_GIFT:
      return <>Click to view reward at your profile page</>
    default:
      return notification.alert
  }
}

export const getNotificationBannerDescription = notification => {
  switch (notification.type) {
    case NOTIFICATION_TYPES.DAILY_TASK_REWARD:
    case NOTIFICATION_TYPES.CHALLENGE_REWARD:
    case NOTIFICATION_TYPES.WELCOME_GIFT:
      return `+${notification.coinReward} Dcoins reward is ready as a ${notification.alert}!`
    default:
      return notification.alert
  }
}

export const getNotificationBannerIllustration = (notification, activeUser) => {
  switch (notification.type) {
    case NOTIFICATION_TYPES.DAILY_TASK_REWARD:
    case NOTIFICATION_TYPES.CHALLENGE_REWARD:
    case NOTIFICATION_TYPES.WELCOME_GIFT:
      return <img src={coinsImg} alt="coins" />
    case NOTIFICATION_TYPES.BADGE_REWARD:
      return <img src={notification.badge.imageFiles[1].url} alt="Badge" />
    default:
      return <ProfileImage user={activeUser} userLevel={activeUser.userLevel} size={66} />
  }
}

export const NotificationResolver = ({ onClick, notification }) => {
  const props = {
    onClick,
    notification
  }

  switch (notification.type) {
    case NOTIFICATION_TYPES.CHALLENGE_ENDED:
    case NOTIFICATION_TYPES.CHALLENGE_ENDED_GLOBAL:
    case NOTIFICATION_TYPES.CHALLENGE_REMINDER:
    case NOTIFICATION_TYPES.NEW_CHALLENGE_GLOBAL:
    case NOTIFICATION_TYPES.ITEM_BUNDLE_SALE_GLOBAL:
      return <BannerNotification {...props} />
    case NOTIFICATION_TYPES.DAILY_TASK_REWARD:
    case NOTIFICATION_TYPES.LEVEL_UP:
    case NOTIFICATION_TYPES.BADGE_REWARD:
    case NOTIFICATION_TYPES.CHALLENGE_REWARD:
    case NOTIFICATION_TYPES.WELCOME_GIFT:
      return <BannerNotification showInfo {...props} />
    default:
      return <SmallNotification {...props} />
  }
}
