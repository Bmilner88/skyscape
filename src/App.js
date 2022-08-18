import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

import Header from "./components/Header";
import Current from "./components/Current";
import Week from "./components/Week";

import "./App.css";

const W_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [searchItems, setSearchItems] = useState({ city: "", state: "" });
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [current, setCurrent] = useState();
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

    setIsLoaded(false);
    setHasSearched(true);

    await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchItems.city},${searchItems.state}&appid=${W_API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${json[0].lat}&lon=${json[0].lon}&exclude=minutely&units=imperial&appid=${W_API_KEY}`
        )
          .then((res) => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setCurrent(result.current);
              setWeek(result.daily.splice(1, 7));
              setSearchItems({ city: "", state: "" });
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
      <form onSubmit={handleSearch}>
        <input
          className="form-input"
          placeholder="Your city"
          name="city"
          value={searchItems.city}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="Your state"
          name="state"
          value={searchItems.state}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {error && <div>Error: {error.message}</div>}

      {!isLoaded && hasSearched && (
        <Fade>
          <div>Loading...</div>
        </Fade>
      )}

      {isLoaded && (
        <div>
          <Fade>
            <Current current={current} />
          </Fade>
          <Fade>
            <Week week={week} />
          </Fade>
        </div>
      )}
    </div>
  );
}

export default App;
