import 'firebase/analytics'
import * as firebase from 'firebase/app'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useHistory, useParams } from 'react-router-dom'
import DesignerLink from '../DesignerLink/DesignerLink'
import InspirationMenu from '../menus/InspirationMenu'
import BackButton from './BackButton'
import HelpCenterSearchBox from './HelpCenterSearchBox'
import LoginNav from './LoginNav'
import styles from './nv.module.css'
import SearchBox from './SearchBox'

const MainNav = props => {
  const history = useHistory()
  const param = useParams()
  const slim = props.slim
  const auth = useSelector(state => state.auth)
  let menuDiv
  if (param[0]) {
    menuDiv = <div></div>
  } else {
    menuDiv = (
      <div>
        <InspirationMenu />
      </div>
    )
  }
  const handleLogoClick = () => {
    const tag = 'nav_logo_clicked'
    firebase.analytics().logEvent(tag)
  }

  return (
    <>
      <div className={`${styles.nb} ${slim ? styles.slimNb : undefined}`}>
        <BackButton {...history} />
        <div className={`${styles.nbl}`}>
          <Link to="/" onClick={handleLogoClick}>
            <div className={styles.logo} />
          </Link>
        </div>

        {slim ? <HelpCenterSearchBox /> : <SearchBox />}

        <div>
          <ul className={`${styles.nbn} ${auth.user ? styles.loggedIn : ''}`}>
            <li>
              <NavLink exact activeClassName={styles.active} to="/">
                Explore
              </NavLink>
            </li>
            <li>
              <Link to={{ pathname: 'https://company.decormatters.com/blog' }} target="_blank">
                Blog
              </Link>
            </li>

            <li>
              <DesignerLink />
            </li>
          </ul>
        </div>
        <LoginNav />
      </div>
      {!slim && (
        <div>
          {/* <InspirationMenu /> */}
          {menuDiv}
        </div>
      )}
    </>
  )
}

export default MainNav
/*
      <div className={styles.msc}>
        <button className={styles.bl} onClick={toggleMenu}>
          <Hamburger className={styles.bli} />
        </button>
      </div>
      */
