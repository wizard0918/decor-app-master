import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { NOTIFICATION_TYPES } from '../../../constants/NotificationTypeConstants'
import { FollowAction, unFollowAction } from '../../../redux/actions/FollowingActions'
import formatDate from '../../../util/formatDate'
import { getNoitificationDescription, getNoitificationLink } from '../../../util/notifications'
import FollowButton from '../../common/FollowButton'
import { ProfileImage } from '../../profile/ProfileImage/ProfileImage'
import {
  ActionImage,
  EventText,
  InfoPart,
  NotificationTime,
  ReadIndicator,
  SmallNotificationWrapper,
  TextSection
} from './SmallNotification.styles'

export const SmallNotification = ({ onClick, notification }) => {
  const dispatch = useDispatch()
  const { sourceUser, updatedAt, userInspiration, type } = notification
  const link = getNoitificationLink(notification)
  const { following } = useSelector(state => state.follows)
  const followState =
    following && following.includes(notification.sourceUser.objectId) ? true : false
  const [isFollowed, setIsFollowed] = useState(followState)

  const handleFollow = e => {
    e.preventDefault()

    if (isFollowed) {
      dispatch(unFollowAction(notification.sourceUser.objectId))
    } else {
      dispatch(FollowAction(notification.sourceUser.objectId))
    }

    setIsFollowed(!isFollowed)

    return false
  }

  return (
    <SmallNotificationWrapper as={link ? Link : 'div'} to={link}>
      <InfoPart onClick={onClick}>
        <ReadIndicator active={notification.status !== 'read'} />
        <ProfileImage size={58} user={sourceUser} userLevel={Math.floor(sourceUser.level)} small />
        <TextSection>
          <EventText>{getNoitificationDescription(notification)}</EventText>
          <NotificationTime>{formatDate(updatedAt)}</NotificationTime>
        </TextSection>
      </InfoPart>
      {userInspiration && userInspiration.idea && (
        <Link onClick={onClick} to={`/design/${userInspiration.objectId}`}>
          <ActionImage src={userInspiration.idea.cfThumbImageUrl} alt="" />
        </Link>
      )}
      {type === NOTIFICATION_TYPES.FOLLOW && (
        <FollowButton onClick={handleFollow} isFollowed={isFollowed} />
      )}
    </SmallNotificationWrapper>
  )
}
