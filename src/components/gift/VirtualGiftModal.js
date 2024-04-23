import { Route, Switch, useHistory } from 'react-router-dom'
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalOverlay from '../common/ModalOverlay'
import { closeSuccessModal, getVirtualGifts, closeModals, sendGift1, getUserInsGifts } from '../../redux/reducers/GiftReducer'
import { loadMe } from '../../profile/store/profileReducer'

import styles from './vg.module.css'
import { ReactComponent as Coin } from '../../assets/coin.svg'
import { ReactComponent as Close } from '../../assets/exit.svg'
import { setShowPurchaseCoins } from '../../redux/reducers/DMReducer'

const GiftSuccessScreen = ({ url, close }) => {
  return (
    <ModalOverlay>
      <div className={styles.giftSuccess}>
        <img src={url} style={{ height: 260, marginTop: 70 }} />
        <div className={styles.giftSuccessMessage}>Success!</div>
        <div className={styles.giftSuccessDetailMessage}>You just sent the gift</div>
        <button
          className={styles.successButton}
          onClick={close}
        >
          {' '}
          OK{' '}
        </button>
      </div>
    </ModalOverlay>
  )
}

const GiftCard = ({ title, url, coins, id, selected, hovered, onClick, onMouseEnter, onMouseLeave, gifUrl }) => ( 
  <div
    className={styles.giftCard}
    style={{ borderColor: selected ? '#FF5E6D' : null }}
    key={id}
    onClick={onClick}
    onMouseEnter = {onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <img src={selected ? gifUrl : (hovered ? gifUrl : url)} alt={title} style={{ height: 80 }} />
    <div className={styles.giftTitle}>{title}</div>
    <div className={styles.giftCost}>{coins} dcoins</div>
  </div>
)

const VirtualGiftModal = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { virtualGiftList, giftModalOpen, userInsIds, giftSuccessOpen } = useSelector(state => state.gift)
  const [selectedId, setSelectedId] = useState(null)
  const [successId, setSuccessId] = useState(null)
  const [selectCoins, setSelectCoins] = useState(0)
  const [zoom, setZoom] = useState(1)
  const me = useSelector(state => state.profile.me)
  const [hoverId, setHoverId] = useState(null)

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth <= 700) {
        setZoom(window.innerWidth / 700);
      }
      else {
        setZoom(1);
      }
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  useEffect(() => {
    dispatch(getVirtualGifts())
  }, [])
  const useOutsideAlerter = (ref, closeMenu, active) => {
    const dispatch = useDispatch()
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(closeMenu())
        document.getElementsByTagName('body')[0].style.overflowY  = 'scroll'
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
  const sendGift = (selectedId, selectCoins) => {
    if(selectCoins > me.numCoins) {
      dispatch(closeModals())
      document.getElementsByTagName('body')[0].style.overflowY  = 'scroll'
      dispatch(setShowPurchaseCoins(true))
    }
    else{
      if(selectedId != null) {
        dispatch(sendGift1(userInsIds, selectedId))
      }
      dispatch(loadMe({ history }))
      dispatch(getUserInsGifts(userInsIds))
      setSuccessId(selectedId);
    }
  }

  const setSelectedIdCoins = (id, coins) => {
    setSelectCoins(coins);
    setSelectedId(id);
  }

  const handleClose = () => {
    setSelectedId(null)
    dispatch(closeSuccessModal());
    dispatch(closeModals())
  }
  useOutsideAlerter(wrapperRef, closeModals, giftModalOpen)

  if (!giftModalOpen) {
    return null
  } else if (giftSuccessOpen && virtualGiftList) {
    return (
      <GiftSuccessScreen
        url={virtualGiftList.find(gift => gift.objectId === successId).gifUrl}
        close={handleClose}
      />
    )
  }

  let gifts = []

  if (virtualGiftList) {
    gifts = virtualGiftList.map(gift => (
      <GiftCard
        title={gift.title}
        url={gift.thumbImageUrl}
        gifUrl={gift.gifUrl}
        coins={gift.numCoins}
        id={gift.objectId}
        selected={gift.objectId === selectedId}
        hovered={gift.objectId === hoverId}
        onMouseEnter={() => setHoverId(gift.objectId)}
        onMouseLeave={() => setHoverId(null)}
        onClick={() => setSelectedIdCoins(gift.objectId, gift.numCoins)}
      />
    ))
  }

  return (
    <ModalOverlay>
      <div className={styles.giftModal} ref={wrapperRef} >
        <Close className={styles.closeButton} onClick={handleClose} />
        <div style={{ display: 'flex' }}>
          <div className={styles.giftHeader}>Send Gifts</div>
          <Coin style={{ height: 24, width: 24, marginTop: 68, marginLeft: 'auto' }} />
          <div className={styles.coinBalance}>Balance: {me.numCoins}</div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div className={styles.giftList} style={{zoom: zoom}}>{gifts}</div>
        </div>
        <button
          className={styles.sendButton}
          disabled={!selectedId}
          onClick={() => sendGift(selectedId, selectCoins)}
        >
          {' '}
          Send{' '}
        </button>
      </div>
    </ModalOverlay>
  )
}

export default VirtualGiftModal
