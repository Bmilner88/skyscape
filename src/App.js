import React, { useState } from "react";
import Header from "./components/Header";
import Current from "./components/Current";
import Week from "./components/Week";

import "./App.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [searchItems, setSearchItems] = useState({ city: "", state: "" });
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [week, setWeek] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchItems({
      ...searchItems,
      [name]: value,
    });
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    console.log(searchItems.city, searchItems.state);
    setHasSearched(true);

    await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchItems.city},${searchItems.state}&appid=${API_KEY}`
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
    setWeek(items.daily.splice(0, 7));
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
        value={searchItems.email}
        onChange={handleChange}
      />
      <input
        className="form-input"
        placeholder="Your state"
        name="state"
        type="state"
        id="state"
        value={searchItems.email}
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

      {!isLoaded && hasSearched && <div>Loading...</div>}

      {isLoaded && (
        <div>
          <Current current={items.current} />
          <Week week={week} />
        </div>
      )}
    </div>
  );
}

export default App;
