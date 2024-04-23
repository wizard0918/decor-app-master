import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Details from '../components/design/Details'
import { loadSavedUserInspirationIds } from '../redux/actions/SaveInspirationAction'
import { count } from '../redux/reducers/DMReducer'

const DesignDetails = props => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(count())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadSavedUserInspirationIds())
  }, [dispatch, auth])

  return (
    <>
      {/*<DefaultHeader />*/}
      <Details {...props}></Details>
    </>
  )
}

export default DesignDetails
