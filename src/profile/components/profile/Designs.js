import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FEED_RESET } from '../../../redux/constants'
import { fetchFeed, setAttr } from '../../../redux/reducers/feedInfiniteSlice'
import DesignFeed from '../DesignFeed'
import BasicDesignCard from './cards/BasicDesignCard'
import DesignTabs from './DesignTabs'
import Feed from './Feed'

const Container = styled.div`
  flex: 1 1 auto;
  background-color: #f5f5f5;
  padding: 24px 56px;
  overflow: auto;

  @media screen and (max-width: 715px) {
    padding: 0;
  }
`

const FeedContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media screen and (max-width: 715px) {
    padding: 0;
    justify-content: center;
  }
`

const options = [
  {
    value: 'posts',
    label: 'My Posts'
  },
  {
    value: 'drafts',
    label: 'Drafts'
  },
  {
    value: 'saved',
    label: 'Saved designs'
  }
]

export const getDesignerDomain = url => {
  var separators = ['/', '.']
  var temp = url.split(new RegExp('[' + separators.join('') + ']', 'g'))
  var domain = 'https://designer.decormatters.com'
  temp.forEach((d, i) => {
    if (d === 'dev') {
      domain = 'https://designer-dev.decormatters.com'
    }
    if (d === 'stage') {
      domain = 'https://designer-stage.decormatters.com'
    }
    if (d === 'www') {
      domain = 'https://designer.decormatters.com'
    }
    if (d === 'localhost:3000') {
      domain = 'http://localhost:3001'
    }
    if (d === 'localhost:3001') {
      domain = 'http://localhost:3000'
    }
  })

  return domain
}

const Designs = ({ userid }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [selectedTab, setSelectedTab] = useState(options[0])
  const { drafts } = useSelector(state => state.design)
  const { savedList } = useSelector(state => state.saveInspiration)
  const { feed, error, loading } = useSelector(state => state.inspiration)

  useEffect(() => {
    if (!userid) return

    var attr = {
      addition: {
        userId: userid
      }
    }

    dispatch(setAttr('inspiration')(attr))
    dispatch(fetchFeed('inspiration')({ status: FEED_RESET }))
  }, [dispatch, userid])

  const handleFetchMore = e => {
    dispatch(fetchFeed('inspiration')({ status: null }))
  }

  const handlePostClick = e => {
    if (!e) return
    history.push('/design/' + e.objectId)
  }

  const handleDraftClick = e => {
    if (!e) return
    const loc = getDesignerDomain(window.location.href)
    window.location.href = loc + '/design/' + e.objectId
  }

  return (
    <Container>
      <DesignTabs options={options} selected={selectedTab} onChange={e => setSelectedTab(e)} />
      <FeedContainer>
        {selectedTab.value === 'posts' && (
          <DesignFeed
            data={feed}
            onFetch={handleFetchMore}
            card={BasicDesignCard}
            loading={loading}
            error={error}
            onClick={handlePostClick}
          />
        )}
        {selectedTab.value === 'drafts' && (
          <Feed data={drafts} card={BasicDesignCard} onClick={handleDraftClick} />
        )}
        {selectedTab.value === 'saved' && (
          <Feed data={savedList} card={BasicDesignCard} onClick={handlePostClick} />
        )}
      </FeedContainer>
    </Container>
  )
}

export default Designs
