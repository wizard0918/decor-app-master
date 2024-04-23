import styled from 'styled-components'
import notificationBg from '../../../assets/images/Rewards_bg.png'

export const BannerContainer = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 10px 18px;

  @media screen and (max-width: 450px) {
    max-width: 100%;
  }

  &:first-of-type {
    margin-top: 14px;
  }
`

export const BannerNotificationWrapper = styled.div`
  border-radius: 16px;
  flex-grow: 0;
  max-width: 388px;

  @media screen and (max-width: 450px) {
    max-width: 95%;
  }
`

export const BannerPoster = styled.img`
  border-radius: 16px 16px 0px 0px;
  width: 388px;
  height: 190px;
  object-fit: cover;
  margin-bottom: -3px;

  @media screen and (max-width: 450px) {
    max-width: 100%;
  }
`

export const InfoPart = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 0px 0px 16px 16px;
  padding: 14px 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const BannerAlertText = styled.p`
  font-size: 13px;
  line-height: 16px;
  color: #000000;
  margin-top: 0;
  margin-bottom: 11px;
`

export const BannerTimeText = styled.span`
  font-size: 12px;
  line-height: 14px;
  color: #979797;
`

export const ArrowButton = styled.div`
  width: 32px;
  height: 32px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: 7px;
    height: 12px;
    opacity: 0.7;
  }
`

export const BannerInfoPoster = styled.div`
  background: #fff3f3;
  background-image: url(${notificationBg});
  background-poisition: center;
  background-size: cover;
  border-radius: 16px 16px 0px 0px;
  width: 388px;
  height: 101px;
  object-fit: cover;
  display: flex;
  flex-durection: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px 40px 19px 25px;
  box-sizing: border-box;
  overflow: hidden;

  @media screen and (max-width: 450px) {
    max-width: 100%;
  }

  & > img {
    height: 70px;
    margin-left: 20px;
  }
`

export const BannerInfoPosterText = styled.p`
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  flex-grow: 0;
  flex-shrink: 1;
  padding-left: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
