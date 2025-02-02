import 'firebase/analytics'
import * as firebase from 'firebase/app'
import { createBrowserHistory } from 'history'
import IntersectionObserver from 'intersection-observer-polyfill'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getFeedByCatId as GetFeeds } from '../../redux/actions/InspirationFeedAction'
import { setScrollPos } from '../../redux/actions/InspirationScrollAction'
import { searchByWord } from '../../redux/actions/SearchAction'
import normalizeFeedData, { noImageFeed } from '../../util/normalizedata'
import UserInfoHeader from '../design/UserInfoHeader'
import SuggestRegisterScroll from '../register/SuggestRegisterScroll'
import GiftBtn from '../social/GiftBtn'
import LikeBtn from '../social/LikeBtn'
import SaveBtn from '../social/SaveBtn'
import ShareBtn from '../social/ShareBtn'
import SocialContainer from '../social/SocialContainer'
import style from './feed.module.css'
import { LoadingIndicator2 } from './LoadingIndicator'

const Container = styled.div`
  position: relative;
`

const Inspirations = ({ id, title }) => {
  const feed = useSelector(state => state.inspirationFeed)
  const { isAuthenticated } = useSelector(state => state.auth)
  return (
    <>
      <Container style={{ minHeight: '7000px' }}>
        <h3 className={style.inspirationTitle}>
          {feed.loading === false
            ? title.length > 100
              ? title.substring(0, 100) + '...'
              : title
            : null}
        </h3>
        <div className={style.inspirationContainer}>
          <InspirationsContainer {...feed} id={id} feed={feed} searchWord={feed.searchWord} />
        </div>
        {/*<SuggestRegisterScroll />*/}
        {!isAuthenticated && feed.page >= 1 && <SuggestRegisterScroll />}
        <LoadingIndicator2 loading={feed.loading} />
      </Container>
    </>
  )
}

/* Looks through dataset and creates indivindial items */
const InspirationsContainer = props => {
  const dispatch = useDispatch()
  const { data, page } = props.feed //useSelector(state => state.inspirationFeed)
  const { likes: likesObj } = useSelector(state => state.like)
  const { savedIds } = useSelector(state => state.saveInspiration)

  const { isAuthenticated } = useSelector(state => state.auth)
  const history = createBrowserHistory()

  const moreFeeds = useCallback(
    node => {
      if (!isAuthenticated && page >= 1) return
      if (props.searchWord === '') dispatch(GetFeeds(props.id, page))
      else dispatch(searchByWord(props.searchWord, page))
    },
    [page, isAuthenticated, dispatch, props.id, props.searchWord]
  )

  const getNormalizedFeedData = () => {
    return normalizeFeedData(data)
  }

  const observer = useRef()
  const lastFeedItem = useCallback(
    node => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            moreFeeds(page)
          }
        },
        {
          threshold: 1
        },
        [page]
      )
      if (node) observer.current.observe(node)
    },
    [moreFeeds, page]
  )

  return (
    <>
      <div className={style.inspiration}>
        {getNormalizedFeedData().map((itemObj, index) => {
          if (getNormalizedFeedData().length === index + 5) {
            return (
              <IndividualItem
                refFn={lastFeedItem}
                {...itemObj}
                likesObj={likesObj}
                savedList={savedIds}
                history={history}
              />
            )
          } else {
            return (
              <IndividualItem
                {...itemObj}
                likesObj={likesObj}
                savedList={savedIds}
                history={history}
              />
            )
          }
        })}
      </div>
    </>
  )
}

/* Individual Feed Item */
export const IndividualItem = props => {
  const { id, url, refFn, type, user, history, page, noTrack, data1 } = props
  const pageTypes = {
    relatedDesign: 1
  }
  const dispatch = useDispatch()
  const savedList = props.savedList
  const setPosition = () => {
    const tag = 'design_relatedesign_clicked'
    firebase.analytics().logEvent(tag)

    if (pageTypes[page] === undefined && noTrack !== true)
      dispatch(setScrollPos(window.pageYOffset, history.location.pathname))
  }
  const data = { user: user }
  const [zoom, setZoom] = useState(1)

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth >= 600 && window.innerWidth < 1024) {
        setZoom(window.innerWidth / 1024)
      } else if (window.innerWidth >= 1024) {
        setZoom(1)
      } else {
        setZoom(1)
      }
    }
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div
      ref={refFn}
      className={`${style.item} ${page === 'relatedDesign' ? style.relatedDesign : ''}`}
      style={{ zoom: zoom }}
      key={id}
      id={id}
    >
      <div className={style.userInfoHeader}>
        <UserInfoHeader data={data} />
      </div>
      <Link
        to={{
          pathname: `/design/${id}`,
          fromSite: true,
          scrollPosition: window.pageYOffset
        }}
        onClick={setPosition}
      >
        <img className={style.inspirationImg} src={url} alt={props.title} onError={noImageFeed} />
      </Link>
      <Link to={'/dm/' + user.objectId} style={{ color: 'white' }}>
        <div className={style.userProfile}>
          <img
            className={style.userImg}
            src={user.thumbProfileImageFile ? user.thumbProfileImageFile.url : ''}
            alt={user.uniqueDisplayName}
            onError={noImageFeed}
          />
          <span className={style.userName}>{user.uniqueDisplayName}</span>
        </div>
      </Link>
      <div className={`${style.socialBtn} ${style.shareBtn}`}>
        <ShareBtn id={id} imgUrl={url} loc="home" />
      </div>
      <div className={style.socialBtnBottom}>
        <GiftBtn id={id} />
        <LikeBtn id={id} loc="home" numLikes={props.likes} />
        <SaveBtn type={type} id={id} savedList={savedList} loc="home" />
      </div>

      <div className={style.socialContainer}>
        <SocialContainer id={id} imgUrl={url} numLikes={props.likes} type={type} data={data1} />
      </div>
    </div>
  )
}

export default Inspirations
