import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as Arrow } from '../../../assets/arrow-right.svg'
import formatDate from '../../../util/formatDate'
import {
  getNoitificationDescription,
  getNoitificationLink,
  getNotificationBannerDescription,
  getNotificationBannerIllustration
} from '../../../util/notifications'
import { ReadIndicator } from '../SmallNotification/SmallNotification.styles'
import {
  ArrowButton,
  BannerAlertText,
  BannerContainer,
  BannerInfoPoster,
  BannerInfoPosterText,
  BannerNotificationWrapper,
  BannerPoster,
  BannerTimeText,
  InfoPart
} from './BannerNotification.styles'

export const BannerNotification = ({ onClick, notification, showInfo }) => {
  const me = useSelector(state => state.profile.me)

  return (
    <BannerContainer onClick={onClick} href={getNoitificationLink(notification)}>
      <ReadIndicator active={true} />
      <BannerNotificationWrapper>
        {!showInfo && (
          <BannerPoster src={notification.designContest.backdropImageFile.url} alt="" />
        )}
        {showInfo && (
          <BannerInfoPoster>
            <BannerInfoPosterText>
              {getNotificationBannerDescription(notification)}
            </BannerInfoPosterText>
            {getNotificationBannerIllustration(notification, me)}
          </BannerInfoPoster>
        )}
        <InfoPart>
          <div>
            <BannerAlertText>{getNoitificationDescription(notification)}</BannerAlertText>
            <BannerTimeText>{formatDate(notification.updatedAt)}</BannerTimeText>
          </div>
          <ArrowButton>
            <Arrow />
          </ArrowButton>
        </InfoPart>
      </BannerNotificationWrapper>
    </BannerContainer>
  )
}
