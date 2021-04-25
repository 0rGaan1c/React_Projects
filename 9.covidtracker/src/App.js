import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import CoronaImage from "./images/image.png";

// to import every component from components folder in just one line
import { Cards, Chart, CountryPicker } from "./components";

// no need to specify index.js at the end, it will be automatic
import { fetchData } from "./api";

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchData();
      setData({ ...fetchedData, country: "global" });
    }
    getData();
  }, []);

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    setData({ ...fetchedData, country });
  };

  return (
    // this make sure that we don't have interference with any other css file
    <div className={styles.container}>
      <img src={CoronaImage} alt="COVID" className={styles.image} />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} />
    </div>
  );
};

export default App;
