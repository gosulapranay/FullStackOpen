import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const api_key = import.meta.env.VITE_SOME_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>
      <h3>Languages spoken:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        style={{ height: "5%", width: "15%" }}
      ></img>
      <br />
      {weather.weather && (
        <>
          <h2>Weather in {country.capital[0]}:</h2>
          <br />
          <p>Temperature {Math.round(weather.main.temp - 273.15)}&#8451;</p>
          <img
            style={{ backgroundColor: "lightgray", borderRadius: 30 }}
            alt={weather.weather[0].main}
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          />
          <p>Wind {weather.wind.speed} m/s </p>
        </>
      )}
    </div>
  );
};
export default Country;
