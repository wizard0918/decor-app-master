import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReactComponent as CoinIcon } from '../../assets/coin.svg'
import { ReactComponent as Close } from '../../assets/cross.svg'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { gotoLogIn } from '../../redux/actions/AuthActions'
import styles from './fm.module.css'
import sharedStyle from './nv.module.css'
import { goToDesigner } from './SecondaryMenu'

const FloatMenu = props => {
  const MEMBER = 'https://didr9pubr8qfh.cloudfront.net/designer/badge_membership_on.png'
  const NONE_MEMBER = 'https://didr9pubr8qfh.cloudfront.net/designer/badge_membership_off.png'
  const { close, logOut, signup } = props
  const { isAuthenticated } = useSelector(state => state.auth)
  const me = useSelector(state => state.profile.me)
  const wrapperRef = useRef(null)
  const dispatch = useDispatch()

  const handleLogIn = () => {
    dispatch(gotoLogIn())
  }

  const closeBox = () => {
    close()
  }

  useOutsideAlerter(wrapperRef, close)

  return (
    <div ref={wrapperRef} className={styles.msw}>
      <div className={styles.ms}>
        <ul>
          <li className={styles.mobileClose} onClick={closeBox}>
            <Close className={sharedStyle.cliBtn} />
          </li>
          {me && (
            <>
              <li className={styles.usernameSection}>
                <span>{me.username}</span>
              </li>
              <li>
                <ul>
                  {me.numCoins && (
                    <li>
                      <Link to={'/dm'} onClick={close} className={styles.pa}>
                        Coin Balance: <CoinIcon className={styles.coinIcon} />{' '}
                        {new Intl.NumberFormat().format(me.numCoins)}
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to={'/dm'} onClick={close} className={styles.pa}>
                      Member:{' '}
                      <img
                        src={me.haveMembership ? MEMBER : NONE_MEMBER}
                        alt="Membership Icon"
                        className={styles.memberIcon}
                      />{' '}
                      {me && me.membership && me.membership.name
                        ? `${me.membership.name} Member`
                        : 'Starter'}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  {process.env.REACT_APP_DESIGNER_ENABLE === '1' && (
                    <li>
                      <Link to={'/'} onClick={goToDesigner} className={styles.pa}>
                        Create Design
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to={'/dm'} onClick={close} className={styles.pa}>
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to={'/blog'} onClick={close} className={styles.pa}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to={'/settings'} onClick={close} className={styles.pa}>
                      Account Settings
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <Link to={'/terms'} onClick={close} className={styles.sa}>
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link to={'/policy'} onClick={close} className={styles.sa}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to={'/help-center'} onClick={close} className={styles.sa}>
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link to={'/about'} onClick={close} className={styles.sa}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'} onClick={logOut} className={styles.pa}>
                      Log Out
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li>
              <ul>
                <li>
                  <Link to={'/'} onClick={handleLogIn} className={styles.pa}>
                    Log In
                  </Link>
                </li>
                <li>
                  <Link to={'/'} onClick={signup} className={styles.pa}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default FloatMenu
