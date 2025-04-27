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
  const GDP = jsonData?.["GDP"]?.toLocaleString() ?? "-";
  const disasterSpending =
    jsonData?.["Disaster Spending"]?.toLocaleString() ?? "-";
  const percentageGDPusedOnDisasterSpending =
    jsonData?.["Percentage of GDP used on disaster spending"]?.toLocaleString(
      undefined,
      { style: "percent", minimumFractionDigits: 2 },
    ) ?? "-";
  const dominantPollutants = jsonData?.["Dominant Pollutants"] ?? "-";
  const plasticPollution =
    jsonData?.["Plastic Pollution"]?.toLocaleString() ?? "-";
  const recapOfPollution = jsonData?.["Recap of Pollution"] ?? "-";
  const solution = jsonData?.["Solution Suggestion"] ?? "-";
  const aqi = jsonData?.["Air Quality Index"] ?? "-";
  const biggestPollutant = jsonData?.["Biggest Air Polluant"] ?? "-";
  const temperatureDiff =
    jsonData?.["Temperature Difference"]?.toFixed(2) ?? "-";

  return (
    <div className={`${styles.popupContainer}`}>
      <div className={styles.popup}>
        <h1>Aerthis</h1>
        <hr></hr>
        <h2>About this Country: </h2>
        <p className={styles.countryName}>{country}</p>
        <ul>
          <li>
            <span className={styles.statTitle}>GDP:</span> {GDP}
          </li>
          <li>
            <span className={styles.statTitle}>
              % of GDP Spent on Disaster Relief:
            </span>{" "}
            {percentageGDPusedOnDisasterSpending}
          </li>
        </ul>
        <hr className={styles.thinHR}></hr>
        <p>
          <span className={styles.statTitle}>Future Prospects:</span> {solution}
        </p>
      </div>
    </div>
  );
};

export default Popup;
