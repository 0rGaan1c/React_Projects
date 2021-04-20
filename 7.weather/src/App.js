import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [unit, setUnit] = useState(true);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      return;
    }
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.cod === "404") {
          setError(true);
          throw new Error();
        }

        const tmpData = {
          inCelcius: (data.main.temp - 273.15).toFixed(2),
          inFarenheit: ((data.main.temp - 273.15) * (9 / 5) + 32).toFixed(2),
          name: data.name,
        };
        setWeatherData(() => {
          return { ...tmpData };
        });
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cityName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    firstUpdate.current = false;
    if (city === "") {
      setError(true);
    }
    setCityName(city);
    setCity("");
  };

  return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city"></label>
        <input
          id="city"
          type="text"
          placeholder="City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          autoComplete="off"
        />
        <button>Submit</button>
      </form>
      <form
        onChange={(e) => {
          if (e.target.value === "farenheit") {
            setUnit(false);
            return;
          }
          setUnit(true);
        }}
      >
        <input
          type="radio"
          id="celcius"
          value="celcius"
          name="temp"
          defaultChecked
        />
        <label htmlFor="celcius">Celcius</label>
        <input type="radio" id="farenheit" value="farenheit" name="temp" />
        <label htmlFor="farenheit">Farenheit</label>
      </form>
      {firstUpdate.current ? (
        ""
      ) : error ? (
        <h3>City Not Found</h3>
      ) : loading ? (
        <h3>Loading</h3>
      ) : (
        <h3>
          {weatherData.name}:
          {unit ? `${weatherData.inCelcius}°C` : `${weatherData.inFarenheit}°F`}
        </h3>
      )}
    </div>
  );
};

export default App;
