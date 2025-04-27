import React from 'react'
import styles from './Popup.module.css';

interface PopupData {
  "Air Quality Index": number;
  "Biggest Air Polluant": string;
  "Country": string;
  "Disaster Spending": number;
  "Dominant Pollutants": string;
  "GDP": number;
  "Percentage of GDP used on disaster spending": number;
  "Plastic Pollution": number;
  "Recap of Pollution": string;
  "Solution Suggestion": string;
  "Temperature Difference": number;
}

const Popup = ({ jsonData }: { jsonData: any}) => {
  const country = jsonData?.["Country"] ?? "No country selected";
  const GDP = jsonData?.["GDP"]?.toLocaleString() ?? "-";
  const disasterSpending = jsonData?.["Disaster Spending"]?.toLocaleString() ?? "-";
  const percentageGDPusedOnDisasterSpending = jsonData?.["Percentage of GDP used on disaster spending"]?.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 }) ?? "-";
  const dominantPollutants = jsonData?.["Dominant Pollutants"] ?? "-";
  const plasticPollution = jsonData?.["Plastic Pollution"]?.toLocaleString() ?? "-";
  const recapOfPollution = jsonData?.["Recap of Pollution"] ?? "-";
  const solution = jsonData?.["Solution Suggestion"] ?? "-";
  const aqi = jsonData?.["Air Quality Index"] ?? "-";
  const biggestPollutant = jsonData?.["Biggest Air Polluant"] ?? "-";
  const temperatureDiff = jsonData?.["Temperature Difference"]?.toFixed(2) ?? "-";

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
