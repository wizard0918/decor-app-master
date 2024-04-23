import React from 'react'
import { ReactComponent as DivideIcon } from '../../assets/productDivider.svg'
import styles from './details.module.css'

export const MobileDivider = () => {
  return (
    <div className={styles.mobiledivider} id="currentArrow">
      <DivideIcon></DivideIcon>
    </div>
  )
}