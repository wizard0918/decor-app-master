import classNames from 'classnames'
import 'firebase/analytics'
import * as firebase from 'firebase/app'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import bellImg from '../../assets/bell.svg'
import { ReactComponent as Hamburger } from '../../assets/menu-icon.svg'
import { ReactComponent as MenuDots } from '../../assets/menudot.svg'
import { gotoLogIn, gotoSignUp, logout as logoutAction } from '../../redux/actions/AuthActions'
import BadgeCounter from '../common/BadgeCounter'
import { PrimaryButton, SecondaryClearButton } from '../common/FormControls'
import FloatMenu from './FloatMenu'
import styles from './lv.module.css'
import NotificationsMenu from './NotificationsMenu'
import sharedStyle from './nv.module.css'
import SecondaryMenu from './SecondaryMenu'

const LoginNav = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const me = useSelector(state => state.profile.me)
  const [showMenu, setShowMenu] = useState(false)
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false)
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false)

  useEffect(() => {
    function getSize() {
      return {
        width: window.innerWidth
      }
    }

    function handleResize() {
      if (isAuthenticated === false && showMenu === true) {
        if (getSize().width >= 768) {
          setShowMenu(false)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [showMenu, isAuthenticated])

  const closeMenu = () => {
    setShowMenu(false)
  }

  const toggleMenu = () => {
    const tag = 'nav_profile_clicked'
    firebase.analytics().logEvent(tag)

    setShowMenu(!showMenu)
    setShowSecondaryMenu(false)
    setShowNotificationsMenu(false)
  }

  const toggleNotificationsMenu = () => {
    const tag = 'nav_notification_clicked'
    firebase.analytics().logEvent(tag)

    setShowMenu(false)
    setShowNotificationsMenu(!showNotificationsMenu)
  }

  const toggleSecondayMenu = () => {
    setShowSecondaryMenu(!showSecondaryMenu)
    setShowNotificationsMenu(false)
  }

  const logOut = () => {
    const tag = 'nav_logout_clicked'
    firebase.analytics().logEvent(tag)

    setShowMenu(false)
    dispatch(logoutAction(history))
  }

  const handleLogIn = () => {
    const tag = 'nav_login_clicked'
    firebase.analytics().logEvent(tag)

    dispatch(gotoLogIn())
  }

  const handleSignUp = () => {
    const tag = 'nav_signup_clicked'
    firebase.analytics().logEvent(tag)

    dispatch(gotoSignUp())
  }

  const isNotificationEnabled = () => {
    return process.env.REACT_APP_NOTIFICATION_ENABLED === '1' ? true : false
  }

  return (
    <>
      {isAuthenticated ? null : (
        <ul className={sharedStyle.nbe}>
          <li className={`${sharedStyle.menuDots} ${showSecondaryMenu ? sharedStyle.active : ''}`}>
            <MenuDots type="button" onClick={toggleSecondayMenu}></MenuDots>
            {showSecondaryMenu ? (
              <SecondaryMenu signup={handleSignUp} close={toggleSecondayMenu} logOut={logOut} />
            ) : null}
          </li>
          <li className="ml-2">
            <PrimaryButton type="button" onClick={handleSignUp}>
              Sign Up
            </PrimaryButton>
          </li>
          <li className="ml-2">
            <SecondaryClearButton type="button" onClick={handleLogIn}>
              Login
            </SecondaryClearButton>
          </li>
        </ul>
      )}

      {isAuthenticated ? (
        <>
          <div>
            {isNotificationEnabled() ? (
              <button
                className={classNames(sharedStyle.bl, {
                  [sharedStyle.blf]: showNotificationsMenu
                })}
                onClick={toggleNotificationsMenu}
              >
                <BadgeCounter count={me.numUnseenNotifications}>
                  <img src={bellImg} alt="Notifications" className={sharedStyle.bell} />
                </BadgeCounter>
              </button>
            ) : (
              false
            )}
          </div>
          <div className={sharedStyle.msp}>
            <button
              className={`${showMenu ? sharedStyle.blf : ''} ${sharedStyle.bl}`}
              onClick={toggleMenu}
            >
              <div
                className={styles.pfbi}
                style={{ backgroundImage: `url(${me && me.pic})` }}
              ></div>
            </button>
          </div>
        </>
      ) : (
        <div className={sharedStyle.msc}>
          <button
            className={`${showMenu ? sharedStyle.blf : ''} ${sharedStyle.bl}`}
            onClick={toggleMenu}
          >
            <Hamburger className={sharedStyle.bli} />
          </button>
        </div>
      )}
      {isNotificationEnabled() && showNotificationsMenu ? (
        <NotificationsMenu close={toggleNotificationsMenu}></NotificationsMenu>
      ) : null}

      {showMenu ? <FloatMenu signup={handleSignUp} close={closeMenu} logOut={logOut} /> : null}
    </>
  )
}

export default LoginNav
