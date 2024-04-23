import React, { useEffect } from 'react'
import { batch, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import {
  loadSavedUserInspiration,
  loadSavedUserInspirationIds
} from '../redux/actions/SaveInspirationAction'
import { getUserId } from '../storage/authLocalStorage'
import Designs from './components/profile/Designs'
import DesignsOthers from './components/profile/DesignsOthers'
import Sidebar from './components/profile/Sidebar'
import SidebarOthers from './components/profile/SidebarOthers'
import { loadDrafts } from './store/designReducer'
import { loadMe, loadOthers } from './store/profileReducer'

const Container = styled.div`
  display: block;
  height: auto;

  @media (min-width: 768px) {
    height: calc(100vh - 112px);
    display: flex;
  }
`

const Me = ({ userid }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    batch(() => {
      dispatch(loadMe({ history }))
      dispatch(loadDrafts())
      dispatch(loadSavedUserInspiration())
      dispatch(loadSavedUserInspirationIds())
    })
  }, [dispatch, history])

  return (
    <Container>
      <Sidebar />
      <Designs userid={userid} />
    </Container>
  )
}

const Others = ({ userid }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userid) return
    dispatch(loadOthers(userid))
  }, [dispatch, userid])

  return (
    <Container>
      <SidebarOthers />
      <DesignsOthers userid={userid} />
    </Container>
  )
}

const Profile = ({ match }) => {
  const { id } = match.params
  if (!id || id === getUserId()) return <Me userid={getUserId()} />
  return <Others userid={id} />
}

export default Profile
