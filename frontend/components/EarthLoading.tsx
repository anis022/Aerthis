import React from 'react'
import styles from './EarthLoading.module.css'
import Image from 'next/image'

const EarthLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      {/* <div className={styles.earth}> */}
        {/* <div className={styles.earthSurface}></div> */}
        <Image src="/Rotating_earth_animated_transparent.gif" alt="Loading Earth" width={200} height={200} />
      {/* </div> */}
      <p className={styles.loadingText}>Loading Earth...</p>
    </div>
  )
}

export default EarthLoading