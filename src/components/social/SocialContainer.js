import React from 'react'
import AllGiftBtn from './AllGiftBtn'
import LikeBtn from './LikeBtn'
import SaveBtn from './SaveBtn'
import SendGiftBtn from './SendGiftBtn'
import ShareBtn from './ShareBtn'
import styles from './socialcontainer.module.css'

const SocialContainer = props => {
  const { id, imgUrl, numLikes, type, data, color } = props
  const numGifts = data === undefined ? 0 : data.numGifts
  const recentVGImageUrls = data === undefined ? '' : data.recentVGImageUrls
  const socialContainer =
    numGifts != undefined ? (
      <div className={styles.socialContainer}>
        <AllGiftBtn props={props} num={numGifts} recentImg={recentVGImageUrls} />
      </div>
    ) : null

  return (
    <div className={styles.mediaContainer}>
      <div className={styles.shareMediaContainer}>
        <LikeBtn id={id} noButton={`false`} numLikes={numLikes} loc="design" color={color} />
        <SaveBtn type={type} id={id} loc="design" color={color} />
        <ShareBtn id={id} imgUrl={imgUrl} loc="design" color={color} />
        <SendGiftBtn color={color} id={id} />
      </div>
      {socialContainer}
    </div>
  )
}

export default SocialContainer
