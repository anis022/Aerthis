import React from 'react'
import styles from './Popup.module.css';

const Popup = ({ jsonData }: { jsonData: any}) => {
  const country: string = (jsonData) ? jsonData["Country"] : "No country selected";
  const GDP = (jsonData) ? jsonData["GDP"] : "-";
  const percentageGDPusedOnDisasterSpending = (jsonData) ? jsonData["Percentage of GDP used on disaster spending"] : "-";
  const solution = (jsonData) ? jsonData["Solution Suggestion"] : "-";
  const disasterSpending = (jsonData) ? jsonData["Disaster Spending"] : "-";
  const dominantPollutants = (jsonData) ? jsonData["Dominant Pollutants"] : "-";
  const recapOfPollution = (jsonData) ? jsonData["Recap of Pollution"] : "-";

  return (
    <div className={`${styles.popupContainer} flex items-center justify-end`} >
      <div className={styles.popup}>
        <h2>Popup Title</h2>
        <p>This is a message inside the popup.</p>
        <p>Country: {country}</p>
        <p>GDP: {GDP}</p>
        <p>Percentage of GDP used on disaster spending: {percentageGDPusedOnDisasterSpending}</p>
        <p>Solution: {solution}</p>

        <span>X</span>
      </div>
    </div>
  )
}

export default Popup
