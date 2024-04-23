import {React, useLayoutEffect} from 'react'
import styles from './userheader.module.css'
import { ReactComponent as ThreeDot } from '../../assets/threedot.svg'
import { useDispatch, useSelector } from 'react-redux'
import { FollowAction, unFollowAction } from '../../redux/actions/FollowingActions'
import { noImageFeed } from '../../util/normalizedata'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { loadMe } from '../../profile/store/profileReducer'

const UserInfoHeader = props => {
  const dispatch = useDispatch()
  const { following } = useSelector(state => state.follows)
  const me = useSelector(state => state.profile.me)
  const id = props.data.user.objectId
  const followState = following && following.includes(props.data.user.objectId) ? true : false
  const [zoom, setZoom] = useState(1);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth <= 600) {
        setZoom(window.innerWidth / 600);
      }
      else {
        setZoom(1);
      }
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  const followClick = e => {
    e.stopPropagation()
    e.preventDefault()
    if (followState) {
      dispatch(unFollowAction(id))
    } else {
      dispatch(FollowAction(id))
    }
  }

  return (
    <>
      <header 
        className={styles.header}
      >
        <Link to={'/dm/' + id} 
        style={{zoom: zoom}}>
          <img
            alt={props.data.user.uniqueDisplayName}
            className={styles.profileImage}
            src={
              props.data.user.thumbProfileImageFile ? props.data.user.thumbProfileImageFile.url : ''
            }
            onError={noImageFeed}
          />
        </Link>
        <div className={styles.aboutUserContainer}>
          <div className={styles.name}>
            <Link to={'/dm/' + id}>{props.data.user.uniqueDisplayName}</Link>
            <div className={`${styles.dotsplit} ${me.objectId == id ? styles.nonDisplay : ''}`} />
            <button
              className={`${styles.followBtn} ${followState ? styles.active : ''} ${me.objectId == id ? styles.nonDisplay : ''}`}
              onClick={followClick}
            >
              {followState ? 'Followed' : 'Follow'}
            </button>
          </div>
          <div className={styles.aboutMe}>{props.data.user.aboutMe}</div>
        </div>
        {/* <button
          className={styles.redesignBtn}
        >
          Redesign
        </button>
        <button
          className={styles.moreBtn}
        >
          <ThreeDot />
        </button> */}
      </header>
    </>
  )
}

export default UserInfoHeader
