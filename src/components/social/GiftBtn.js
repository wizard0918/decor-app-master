import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './social.module.css'
import { ReactComponent as Gift } from '../../assets/social/gift.svg'
import { openModals } from '../../redux/reducers/GiftReducer'

const GiftBtn = ({ noButton, id }) => {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState(id)
  return (
    <div className={styles.giftContainer}>
      <button className={styles.giftBtn} onClick={() => dispatch(openModals(userId))}>
        <Gift style={{ height: 23, width: 23, marginLeft: -3, marginRight: -3 }} />
        <span>Gift</span>
      </button>
    </div>
  )
}

export default GiftBtn
