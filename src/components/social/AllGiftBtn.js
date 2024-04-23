import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './social.module.css'
import AllGift from '../../assets/social/allgift.png';
// import { ReactComponent as Gift } from '../../assets/social/gift.svg'
import { openAllGiftModals } from '../../redux/reducers/GiftReducer'

const AllGiftBtn = ({ num, recentImg, props }) => {
  const dispatch = useDispatch()
  let userInsId;
  if(props) {
    userInsId = props.id
  }
  let img = recentImg.length === 0 ?  
    <img src={AllGift} /> : 
    recentImg.map((items, index) => { 
      return (<img src={items} key={index} className={styles.recentImg} />)
    });

  return (
    <div className={styles.allgiftBtn} onClick={() => dispatch(openAllGiftModals({num, userInsId}))}>
      <div className={styles.allimg}>
        {img}
      </div>
      <span>{num}</span>
    </div>
  )
}

export default AllGiftBtn