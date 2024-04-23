import styled from 'styled-components'

export const SmallNotificationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 13px 26px 13px 10px;
`

export const ReadIndicator = styled.div`
  width: 8px;
  height: 8px;
  content: '';
  background: ${props => (props.active ? 'rgba(255, 94, 109, 1)' : 'rgba(229, 229, 229, 1)')};
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
`

export const InfoPart = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-right: 16px;
`

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 14px;
  height: 50px;
  flex-grow: 0;
  max-width: 226px;
`

export const NotificationContent = styled.p`
  padding: 0;
  margin: 0;
  margin-bottom: 8px;
`

export const LikeText = styled(NotificationContent)`
  font-size: 12px;
  line-height: 14.65px;
  letter-spacing: 2%;
  color: black;
  font-weight: 500;
`

export const EventText = styled(NotificationContent)`
  font-size: 13px;
  line-height: 16.7px;
`

export const NotificationTime = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 13px;
  letter-spacing: 0.02em;
  color: rgba(139, 139, 139, 1);
`

export const ActionImage = styled.img`
  width: 56px;
  height: 56px;
`

export const GiftImage = styled.img`
  height: 26px;
  vertical-align: middle;
`
