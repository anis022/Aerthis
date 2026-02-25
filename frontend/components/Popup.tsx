import React from "react";
import styles from "./Popup.module.css";

interface PopupData {
  "Air Quality Index": number;
  "Biggest Air Polluant": string;
  Country: string;
  "Disaster Spending": number;
  "Dominant Pollutants": string;
  GDP: number;
  "Percentage of GDP used on disaster spending": number;
  "Plastic Pollution": number;
  "Recap of Pollution": string;
  "Solution Suggestion": string;
  "Temperature Difference": number;
}

const Popup = ({ jsonData }: { jsonData: any }) => {
  const country = jsonData?.["Country"] ?? "No country selected";
  let GDP =
    new Intl.NumberFormat("en-US", { maximumSignificantDigits: 4 }).format(
      jsonData?.["GDP"] / 1000000000,
    ) ?? "-";
  if (GDP !== "-") {
    GDP = `US$${GDP}B`;
  }
  let disasterSpending =
    new Intl.NumberFormat("en-US", { maximumSignificantDigits: 4 }).format(
      jsonData?.["Disaster Spending"] / 1000000,
    ) ?? "-";
  if (disasterSpending !== "-") {
    disasterSpending = `US$${disasterSpending}M`;
  }
  let percentageGDPusedOnDisasterSpending =
    new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(
      jsonData?.["Percentage of GDP used on disaster spending"],
    ) ?? "-";
  if (percentageGDPusedOnDisasterSpending !== "-") {
    percentageGDPusedOnDisasterSpending = `${percentageGDPusedOnDisasterSpending}%`;
  }
  const dominantPollutants = jsonData?.["Dominant Pollutants"] ?? "-";
  let plasticPollution =
    jsonData?.["Plastic Pollution"]?.toLocaleString() ?? "-";
  if (plasticPollution !== "-") {
    plasticPollution = `${plasticPollution}t`;
  }
  const recapOfPollution = jsonData?.["Recap of Pollution"] ?? "-";
  const solution = jsonData?.["Solution Suggestion"] ?? "-";
  const aqi = jsonData?.["Air Quality Index"] ?? "-";
  const biggestPollutant = jsonData?.["Biggest Air Polluant"] ?? "-";
  let temperatureDiff =
    new Intl.NumberFormat("en-US", { maximumSignificantDigits: 4 }).format(
      jsonData?.["Temperature Difference"],
    ) ?? "-";
  if (temperatureDiff !== "-") {
    temperatureDiff = `+${temperatureDiff}°C`;
  }

  if (jsonData?.status === "loading") {
    return <div className={`${styles.popupContainer}`}>
      <div className={styles.popup}><h1>Loading...</h1></div></div>;
  }

  return (
    <div className={`${styles.popupContainer}`}>
      <div className={styles.popup}>
        <h1>Aerthis</h1>
        <hr></hr>
        <h2>About this Country: </h2>
        <p className={styles.countryName}>{country}</p>
        <ul>
          <li>
            <span className={styles.statTitle}>Air Quality:</span> {aqi}
          </li>
          <li>
            <span className={styles.statTitle}>Top Pollutant:</span>{" "}
            {biggestPollutant}
          </li>
          <li>
            <span className={styles.statTitle}>
              Temperature Variation Since the 1950s:
            </span>{" "}
            +{temperatureDiff}
          </li>
          <li>
            <span className={styles.statTitle}>GDP:</span> {GDP}
          </li>
          <li>
            <span className={styles.statTitle}>Disaster Relief Spending:</span>{" "}
            {disasterSpending}
          </li>
          <li>
            <span className={styles.statTitle}>
              % of GDP Spent on Disaster Relief:
            </span>{" "}
            {percentageGDPusedOnDisasterSpending}
          </li>
          <li>
            <span className={styles.statTitle}>Dominant Pollutants:</span>{" "}
            {dominantPollutants}
          </li>
          <li>
            <span className={styles.statTitle}>
              Plastic Waste Generated per Year:
            </span>{" "}
            {plasticPollution}
          </li>
        </ul>
        <hr className={styles.thinHR}></hr>
        <p>
          <span className={styles.statTitle}>Recap on Pollution:</span>{" "}
          {recapOfPollution}
          <br/><span className={styles.statTitle}>Future Prospects:</span>{" "}
          {solution}
        </p>
      </div>
    </div>
  );
};

export default Popup;
