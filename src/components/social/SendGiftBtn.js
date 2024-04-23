import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './social.module.css'
import Gift1 from '../../assets/social/gift.png';
import { ReactComponent as Gift } from '../../assets/social/gift.svg'
import { openModals } from '../../redux/reducers/GiftReducer'

const SendGiftBtn = ({ noButton, color, id }) => {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState(id)

  // let giftImg
  // useLayoutEffect(() => {
  //   function updateSize() {
  //     if (window.innerWidth <= 1024) {
  //       giftImg = <img src={Gift1} />
  //     }
  //     else {
  //       giftImg = <Gift style={{ height: 23, width: 23, marginLeft: -3 }} />
  //     }
  //   }
  //   window.addEventListener('resize', updateSize);
  //   return () => window.removeEventListener('resize', updateSize);
  // }, []);

  return (
    <div className={`${styles.updateBtn} ${styles.imgBtn} ${color == "opacity" ? styles.updateBtnColor : ''}`} onClick={() => dispatch(openModals(userId))}>
      {/* Not sure why gift svg doesn't work here */}
      <Gift style={{ height: 23, width: 23, marginLeft: -3 }} />
      <img src={Gift1} />
      {/* {giftImg} */}
      <span className={styles.giftText}>Send Gift</span>
    </div>
  )
}

export default SendGiftBtn