import React from 'react'
import styles from './EarthLoading.module.css'
import Image from 'next/image'

const EarthLoading = () => {
  return (
    <div className={styles.loadingContainer}>
        <Image unoptimized src="/Rotating_earth_animated_transparent.gif" alt="Loading Earth" width={200} height={200} />
      <p className={styles.loadingText}>Loading Earth...</p>
    </div>
  )
}

export default EarthLoading