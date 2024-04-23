import 'firebase/analytics'
import * as firebase from 'firebase/app'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as Save } from '../../assets/social/save.svg'
import { removeInspiration, saveInspiration } from '../../redux/actions/SaveInspirationAction'
import style from './social.module.css'

const SaveBtn = ({ id, type, noButton, loc, color }) => {
  const dispatch = useDispatch()
  const { savedIds } = useSelector(state => state.saveInspiration)

  let saved = false

  if (typeof savedIds !== 'undefined' && savedIds.includes(id)) {
    saved = true
  }

  const saveClick = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()

    if (!saved) {
      const tag = loc + '_save_clicked'
      firebase.analytics().logEvent(tag)
      dispatch(saveInspiration(id, type))
    } else {
      const tag = loc + '_unsave_clicked'
      firebase.analytics().logEvent(tag)
      dispatch(removeInspiration(id, type))
    }
  }

  return (
    <div className={style.saveContainer}>
      {noButton === undefined ? (
        <div
          onClick={saveClick}
          className={`${saved ? style.active : ''} ${style.updateBtn} ${
            color == 'opacity' ? style.updateBtnColor : ''
          }`}
        >
          <Save className={style.save} />
          <span className={style.saveText}>{saved ? 'Saved' : 'Save'}</span>
        </div>
      ) : (
        <div
          onClick={e => {
            saveClick(e)
          }}
          className={`${saved ? style.active : ''} ${style.saveBtn} ${
            color === 'opacity' ? style.updateBtnColor : ''
          }`}
        >
          <Save className={style.save} />
        </div>
      )}
    </div>
  )
}

export default SaveBtn
