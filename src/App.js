import React, { useState } from "react";
import Header from "./components/Header";
import Current from "./components/Current";
import Week from "./components/Week";

import "./App.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [stateItems, setStateItems] = useState({ city: "", state: "" });
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setStateItems({
      ...stateItems,
      [name]: value,
    });
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    console.log(stateItems.city, stateItems.state);

    await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${stateItems.city},${stateItems.state}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${json[0].lat}&lon=${json[0].lon}&units=imperial&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );
      });
  };

  return (
    <div className="App">
      <Header className="App-header" />
      <input
        className="form-input"
        placeholder="Your city"
        name="city"
        type="city"
        id="city"
        value={stateItems.email}
        onChange={handleChange}
      />
      <input
        className="form-input"
        placeholder="Your state"
        name="state"
        type="state"
        id="state"
        value={stateItems.email}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>

      {error && (
        <div>
          <div className="card" id="weatherCard">
            <div className="card-body">
              <div className="weatherTitle">Local Weather</div>
              <div className="card-text">
                <div>Error: {error.message}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoaded && <div>Loading...</div>}

      {isLoaded && (
        <div>
          <Current current={items.current} />
          <Week week={items.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
