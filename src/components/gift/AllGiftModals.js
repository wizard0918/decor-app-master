import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalOverlay from '../common/ModalOverlay'
import { closeAllGiftModal, getUserInsGifts } from '../../redux/reducers/GiftReducer'
import { FollowAction, unFollowAction } from '../../redux/actions/FollowingActions'
import styles from './vg.module.css'
import { ReactComponent as Close } from '../../assets/exit.svg'
import formatDate from '../../util/formatDate'
 
const CardItem = ({ data, userPhoto, giftImg, userName, followingDate, count, followed }) => {
  const dispatch = useDispatch()
  const handleFollow = () => {
    dispatch(FollowAction(data.objectId))
  }

  const handleUnfollow = () => {
    dispatch(unFollowAction(data.objectId))
  }
  let dateFollow = formatDate(followingDate)
  let countDiv = count == 1 ? null : 
      <div className={styles.giftNum}>
        x{count}
      </div>
  let username = userName == undefined ? `DM_User_${data.objectId.slice(-2)}` : userName;
  let userImg = userPhoto == undefined ? data.cfTbImageUrl : userPhoto;
  if (!userImg) {
    userImg = 'https://didr9pubr8qfh.cloudfront.net/mobile_other/profile_avatars/Profile5.png'
  }
  return (
    <div className={styles.giftAllItemsBody}>
      <div className={styles.giftAllItemsInfo}>
        <div className={styles.giftAllItemsPhoto}>
          <img src={userImg} />
          <img src={giftImg} className={styles.giftImage} />
        </div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{username}</p>
          <p className={styles.followingDate}>{dateFollow}</p>
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        {countDiv}
        <FollowButton
          following={followed}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
        />
      </div>
    </div>
  )
}

const FollowButton = ({ following, handleFollow, handleUnfollow }) => {
  if (following) {
    return (
      <button onClick={handleUnfollow} className={styles.followButtonFollowing}>
        {' '}
        Following{' '}
      </button>
    )
  } else {
    return (
      <button onClick={handleFollow} className={styles.followButton}>
        {' '}
        Follow{' '}
      </button>
    )
  }
}

const AllGiftModals = ({ url }) => {
    const dispatch = useDispatch()
    const { allGiftModal, virtualGiftList, numGift, userInsIds, userInsGiftList } = useSelector(state => state.gift)
    const { following } = useSelector(state => state.follows)
    const close = () => {
        dispatch(closeAllGiftModal())
    }
    useEffect(() => {
      dispatch(getUserInsGifts(userInsIds))
    }, [userInsIds])
    const useOutsideAlerter = (ref, closeMenu, active) => {
      const dispatch = useDispatch()
    
      const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(closeMenu())
        }
      }
    
      useEffect(() => {
        if (active) document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      })
    }
  
    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef, closeAllGiftModal, allGiftModal)

    if (!allGiftModal) {
        return null
    }
    let userlist = {}
    userInsGiftList.map((user,index) => {
     if(userlist[user.sendingUser.username]) {
       userlist[user.sendingUser.username].count += (user.numDups ? user.numDups + 1 : 1);
     }
     else {
      userlist[user.sendingUser.username] = 
        {
          count: user.numDups ? user.numDups + 1 : 1,
          objectId: user.sendingUser.objectId,
          cfTbImageUrl: user.sendingUser.cfTbImageUrl,
          userPhoto: user.sendingUser.funAvatarImageUrl,
          giftImg: user.virtualGift.imageUrl,
          followingDate: user.createdAt,
          displayName: user.sendingUser.uniqueDisplayName,
        }
     }
    });
    console.log('userlist', userlist);
    
    let users = []
    let arr = Object.keys(userlist).map((k) => userlist[k])
    if (arr) {
      users = arr.map((user,index) => (
        <CardItem
          data = {user}
          key = {index}
          userPhoto={user.userPhoto}
          giftImg={user.giftImg}
          userName={user.displayName}
          followingDate={user.followingDate}
          count={user.count}
          followed={following.includes(user.objectId)}
        />
      ))
    }

    return (
      <ModalOverlay>
        <div className={styles.giftAllItems} ref={wrapperRef}>
          <div className={styles.giftAllItemsHeader}>
            <Close className={styles.closeButton} onClick={close} />
            <span className={styles.giftAllItemsTitle}>All Gifts {numGift}</span>
          </div>
          <div className={styles.giftAllItemsContent}>
            {users}
          </div>
          <button
            className={styles.sendButtonGift}
            onClick={close}
          >
            {' '}
            Close{' '}
          </button>
        </div>
      </ModalOverlay>
    )
}
export default AllGiftModals