import styled from 'styled-components'
import { ReactComponent as Arrow } from '../../../assets/arrow-right.svg'

export const NotificationsMenuContainer = styled.div`
  top: 65px;
  right: 10px;
  width: 440px;
  height: 724px;
  position: absolute;
  background-color: white;
  z-index: 10;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media screen and (max-height: 768px) {
    height: 600px;
  }

  @media screen and (max-width: 450px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`

export const NotificationTabs = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #e5e5e5;
`

export const TabContent = styled.button`
  width: 100%;
  height: 100%;
  padding: 22px;
  border: none;
  cursor: default;
  font-size: 14px;
  border-bottom: 3px solid transparent;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.5);
`

export const NotificationTab = styled.li`
  text-align: center;
  flex-grow: 1;

  &.active ${TabContent}, &:hover ${TabContent} {
    border-bottom: 3px solid black;
    color: rgba(0, 0, 0, 1);
  }
`

export const NotificationsList = styled.ul`
  list-style: none;
  height: 100%;
  overflow: auto;
  margin: 0;
  padding: 0;
  margin-right: 5px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e5e5e5;
    border-radius: 5px;
    width: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #e5e5e5;
  }
`

export const NotificationBlock = styled.li`
  margin-bottom: 8px;
`

export const EmptyState = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #000000;
  padding-top: 80px;
`

export const NotificationsHeaderMobile = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  padding: 16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  align-items: center;
  letter-spacing: 0.02em;
  color: #000000;

  @media screen and (max-width: 450px) {
    display: flex;
  }
`

export const BackArrowButton = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  left: 15px;
  top: 15px;
`

export const BackArrow = styled(Arrow)`
  transform: rotate(180deg);
`
