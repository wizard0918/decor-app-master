import 'firebase/analytics'
import * as firebase from 'firebase/app'
import React, { useCallback, useEffect, useState } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NoResults from '../assets/noresults.png'
import BlogFooter from '../components/blog/Footer'
import Inspirations from '../components/feeds/InspirationFeed'
import HelmetDesignDetails from '../components/helmet/HelmetDesignDetails'
import { GetSearchBar } from '../components/navs/SearchBox'
import { contentIsLoading } from '../redux/actions/InspirationFeedAction'
import { getPopularHashtags } from '../redux/actions/PopularHashTagsAction'
import { loadSavedUserInspiration } from '../redux/actions/SaveInspirationAction'
import { searchByWord } from '../redux/actions/SearchAction'
import hashtagStyle from './hashtag.module.css'

const Filter = require('bad-words')

const Search = props => {
  const title = new URLSearchParams(props.location.search).get('q')
  const position = useSelector(state => state.scroll.position)
  const dispatch = useDispatch()
  const id = 'search'
  const filter = new Filter()
  const [metaTitle, setMetaTitle] = useState()

  const getSearchWordDecoded = useCallback(() => {
    // dispatch(loadSavedUserInspiration())
    if (title === null) return ''

    return decodeURIComponent(title)
  }, [title])

  useEffect(() => {
    if (!GetSearchBar || GetSearchBar === null) return
    GetSearchBar().value = getSearchWordDecoded() //move to shared component
    GetSearchBar().blur()
    window.scrollTo(0, position)
  }, [position, title, getSearchWordDecoded])

  useEffect(() => {
    if (position !== 0) return

    GetSearchBar().blur()
    const searchWord = getSearchWordDecoded() //.replace('#', '')
    contentIsLoading(true, 0)
    const filter = new Filter()
    if (filter.isProfane(searchWord)) {
      GetSearchBar().value = null
      return
    }
    setMetaTitle('DecorMatters Search Result-' + getSearchWordDecoded())
    batch(() => {
      dispatch(loadSavedUserInspiration())
      dispatch(searchByWord(searchWord))
    })
    let myStorage = window.sessionStorage
    myStorage.removeItem('currPageName')
  }, [title, getSearchWordDecoded, dispatch, position])

  return (
    <>
      <HelmetDesignDetails
        data={{
          title: metaTitle,
          subTitle: metaTitle,
          feedImageFile: { url: '/logo192.png' }
        }}
      />
      <div>
        {filter.isProfane(getSearchWordDecoded()) && <NoSearchResultsContainer />}

        {!filter.isProfane(getSearchWordDecoded()) && (
          <Inspirations id={id} title={getSearchWordDecoded()} />
        )}
      </div>
    </>
  )
}

const NoSearchResultsContainer = () => {
  return (
    <>
      <div className={hashtagStyle.noResultsContainer}>
        <PopularHashTags />
        <BlogFooter />
      </div>
    </>
  )
}

const PopularHashTags = () => {
  const popularText = 'Recommended by DecorMatters'
  const { popularHashTags } = useSelector(state => state.popularHashTags)
  const dispatch = useDispatch()

  useEffect(() => {
    if (popularHashTags && popularHashTags.hashtags && popularHashTags.hashtags.length > 0) return
    dispatch(getPopularHashtags())
  }, [popularHashTags, dispatch])

  return (
    <>
      <img src={NoResults} alt={'noresults'} />
      <p className={hashtagStyle.msg}>This is an invalid search term. Please try again!</p>
      <ul className={hashtagStyle.popularHashTagUL}>
        <li key={'PopularText'} className={hashtagStyle.popularP}>
          <p>{popularText}</p>
        </li>
        <ul key={'list-hash'}>
          {popularHashTags &&
            popularHashTags.hashtags &&
            popularHashTags.hashtags.length > 0 &&
            popularHashTags.hashtags.map((hashtag, index) => {
              if (index > 5 || hashtag.hashtagType !== 'adminPick') return false
              return (
                <li className={hashtagStyle.hashtagList} key={'popular_' + index}>
                  <Link
                    onClick={() => firebase.analytics().logEvent('invalidSearch_hashtag_clicked')}
                    role={'link'}
                    to={'/search/?q=' + encodeURIComponent('#' + hashtag.title)}
                  >
                    <p>#{hashtag.title}</p>
                    <img
                      className={hashtagStyle.hashtagImg}
                      src={hashtag.previewImageUrl}
                      onError={e =>
                        (e.target.src =
                          'didr9pubr8qfh.cloudfront.net/cfbaf6beae03cf4a47996d2ee39e9abd_Idea-Thumb.jpg')
                      }
                      alt={'hashtagimg'}
                    />
                  </Link>
                </li>
              )
            })}
        </ul>
      </ul>
    </>
  )
}

export default Search
