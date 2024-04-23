import { createSlice } from '@reduxjs/toolkit'
import { parseHeaders } from '../../util/fetchUtil'
import { gotoLogIn } from '../actions/AuthActions'
import { GetDetails } from '../actions/DesignDetailsAction';
import axios from 'axios'
import verifyEmailAlert from '../../util/verifyEmail'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

const BASE =
  process.env.REACT_APP_APPID === '1'
    ? 'https://decormatters-dev.herokuapp.com/parse/functions/'
    : `https://decormatters-prod.herokuapp.com/parse/functions/`

const ENDPOINTS = {
  GET_VIRTUAL_GIFTS: `${BASE}getVirtualGifts1`,
  GET_SEND_GIFTS: `${BASE}getUserInsGifts1`,
  SET_SEND_GIFTS: `${BASE}createUserInsGift1`
}

const gift = createSlice({
  name: 'gift',
  initialState: {
    giftModalOpen: false,
    allGiftModal: false,
    numGift: 0,
    userInsIds: "",
    virtualGiftList: [],
    userInsGiftList: [],
    giftSuccessOpen: false,
  },
  reducers: {
    openAllGiftModal: (state, action) => {
      state.allGiftModal = true
      state.numGift = action.payload.num
      state.userInsIds = action.payload.userInsId
    },
    closeAllGiftModal: state => {
      state.allGiftModal = false
    },
    openModal: (state, action) => {
      state.giftModalOpen = true
      state.userInsIds = action.payload
    },
    closeModal: state => {
      state.giftModalOpen = false
    },
    setVirtualGiftList: (state, action) => {
      state.virtualGiftList = action.payload
    },
    setUserInsGiftList: (state, action) => {
      state.userInsGiftList = action.payload
    },
    openSuccessModal: (state, action) => {
      state.giftSuccessOpen = true
    },
    closeSuccessModal: (state, action) => {
      state.giftSuccessOpen = false
    },
  }
})

export const { closeSuccessModal, openSuccessModal, openModal, closeModal, openAllGiftModal, closeAllGiftModal, setUserInsGiftList, setVirtualGiftList } = gift.actions

export const openModals = (id) => {
  document.getElementsByTagName('body')[0].style.overflowY  = 'hidden'
  return async (dispatch, state) => {
    if (state().auth.isAuthenticated === false) {
      dispatch(gotoLogIn())
      return false
    }

    if (state().auth.user && !(await verifyEmailAlert(dispatch, state().auth.user.puser))) {
      return false
    }
    return dispatch(gift.actions.openModal(id))

  }
}

export const closeModals = () => {
  document.getElementsByTagName('body')[0].style.overflowY  = 'scroll'
  return async (dispatch, state) => {
    return dispatch(gift.actions.closeModal())
  }
}

export const openAllGiftModals = (data) => {
  return async (dispatch, state) => {
    if (state().auth.isAuthenticated === false) {
      dispatch(gotoLogIn())
      return false
    }

    if (state().auth.user && !(await verifyEmailAlert(dispatch, state().auth.user.puser))) {
      return false
    }
    return dispatch(gift.actions.openAllGiftModal(data))

  }
}


export const getVirtualGifts = (skip = 0, previous = []) => {
  return async (dispatch, state) => {
    try {
      let response = await fetch(ENDPOINTS.GET_VIRTUAL_GIFTS, {
        method: 'POST',
        mode: 'cors',
        headers: parseHeaders(),
        body: JSON.stringify({ skip })
      })
      let { result } = await response.json()
      if (result && result.virtualGifts && result.virtualGifts.length)
        return dispatch(getVirtualGifts(skip + 10, previous.concat(result.virtualGifts)))
      else {
        return dispatch(gift.actions.setVirtualGiftList(previous))
      }
    } catch (error) {
      // handle error
    }
  }
}

export const getUserInsGifts = (userInsId, skip = 0, previous = []) => {
  return async (dispatch, state) => {
    if(userInsId.length > 0) {
      try {
        let response = await fetch(ENDPOINTS.GET_SEND_GIFTS, {
          method: 'POST',
          mode: 'cors',
          headers: parseHeaders(),
          body: JSON.stringify({ userInsId, skip })
        })
        let { result } = await response.json()
        if (result && result.userInsGifts && result.userInsGifts.length)
          return dispatch(getUserInsGifts(userInsId, skip + 10, previous.concat(result.userInsGifts)))
        else {
          return dispatch(gift.actions.setUserInsGiftList(previous))
        }
      } catch (error) {
        // handle error
      }
    }
    
  }
}

export const sendGift1 = (userInsId, virtualGiftId) => {
  return async (dispatch, state) => {
    try {
      let response = await fetch(ENDPOINTS.SET_SEND_GIFTS, {
        method: 'POST',
        mode: 'cors',
        headers: parseHeaders(),
        body: JSON.stringify({ userInsId, virtualGiftId })
      })
      let { result } = await response.json()
      dispatch(getDetailsById1(userInsId));
      if(result && result.userInsGift && result.userInsGift.length) {
        dispatch(getUserInsGifts(userInsId))
      }
    } catch (error) {
      // handle error
    }
  }
}

export function getDetailsById1(userInspirationId) {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: parseHeaders(),
    body: JSON.stringify({
      objectId: userInspirationId
    })
  }

  return async dispatch => {
    try {
      const response = await fetch(process.env.REACT_APP_GET_USER_INSPIRATION, appendant)

      const responseJson = await response.json()

      dispatch(GetDetails(userInspirationId, responseJson.result))
      setTimeout(dispatch(gift.actions.openSuccessModal()), 600);

      firebase.analytics().logEvent('page_view', {
        content_type: 'inspiration',
        content_id: userInspirationId
      })
    } catch (error) {
      //dispatch(inspirationFetchHasErrored(true, error.toString()));
    }
  }
}

export default gift.reducer
