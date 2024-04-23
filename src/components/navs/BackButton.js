import React from 'react'
import { useHistory } from 'react-router-dom'
import { ReactComponent as BackBtnNav } from '../../assets/Back.svg'
import { ReactComponent as BackBtn } from '../../assets/BackNavBtn.svg'
import styles from './backbutton.module.css'

/* Show backbutton mobile on these pages */
/* Show web will display button on desktop */
const showPages = [
  { uri: '/design/', showWeb: 1 },
  { uri: 'blog/', showWeb: 0 },
  { uri: 'profile/', showWeb: 1 }
]

const BackButton = props => {
  const history = useHistory()

  //only show on design page for now.
  const goBack = () => {
    //const { hostname, port } = new URL(window.location.href)
    //console.log(document.referrer, hostname, port)
    if (
      history.location.fromSite ||
      history.location.state !== undefined ||
      history.action === 'REPLACE' ||
      history.action === 'PUSH'
    ) {
      history.goBack()
    } else {
      var separators = ['/', '.']
      var temp = document.referrer.split(new RegExp('[' + separators.join('') + ']', 'g'))
      temp = temp.filter(t => t !== '')

      var fromDesigner = false

      temp.forEach((d, i) => {
        if (d === 'designer-dev') fromDesigner = true
        if (d === 'designer-stage') fromDesigner = true
        if (d === 'designer') fromDesigner = true
        if (d === 'localhost:4001') fromDesigner = true
      })

      if (fromDesigner) history.goBack()
      else history.replace('/')
    }
  }

  const isActive = () => {
    let className = styles.active
    const pathName = history.location.pathname

    const result = showPages.filter(word => pathName.indexOf(word.uri) > -1)

    if (result.length > 0 && result[0].showWeb !== 1) {
      className += ' ' + styles.hide
    }

    if (result.length > 0) return className
    return ''
  }

  return (
    <div className={`${styles.backBtnContainer} ${isActive()}`}>
      <BackBtn onClick={goBack} className={`${styles.backBtn} ${isActive()}`} />
      <BackBtnNav onClick={goBack} className={`${styles.backBtnNav} ${isActive()}`} />
    </div>
  )
}

export default BackButton
