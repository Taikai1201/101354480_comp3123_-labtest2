// Weather.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [data, setData] = useState('');
  const [search, setSearch] = useState('Toronto');
  const key = '941be1ff03bf25b170aaed736668af24';

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleOnCityChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [key, search]);

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          marginBottom: '20px',
        }}
      >
        <label htmlFor="search" style={{ marginRight: '10px' }}>
          Enter City:
        </label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleOnCityChange}
          style={{
            padding: '8px',
            marginRight: '10px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      {data && (
        <div>
          <h2>{data.name}</h2>
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="img"
              style={{
                width: '120px',
                height: '120px',
                marginBottom: '12px',
              }}
            />
          </div>
          <p>Temperature: {data.main.temp} °F</p>
          <p>Humidity: {data.main.humidity} %</p>
          <p>Weather condition: {data.weather[0].description}</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
          <p>Visibility: {data.visibility} meters</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
