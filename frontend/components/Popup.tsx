import React from 'react'
import styles from './Popup.module.css';

const Popup = () => {
  return (
    <div className={`${styles.popupContainer} flex items-center justify-end`} >
      <div className={styles.popup}>
        <h2>Popup Title</h2>
        <p>This is a message inside the popup.</p>
        <span>X</span>
      </div>
    </div>
  )
}

export default Popup
