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

  const [cityState, setCityState] = useState({ city: "", state: "" });
  const [current, setCurrent] = useState();
  const [week, setWeek] = useState();
  const [hourly, setHourly] = useState();

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
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchItems.city.toLowerCase()},${searchItems.state.toLowerCase()}&appid=${W_API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCityState({ city: `${json[0].name}`, state: `${json[0].state}`});
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${json[0].lat}&lon=${json[0].lon}&exclude=minutely&units=imperial&appid=${W_API_KEY}`
        )
          .then((res) => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setCurrent(result.current);
              setWeek(result.daily.splice(1, 7));
              setHourly(result.hourly.splice(1, 11));
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
      <Header />
      <nav className="app-header">
        <form className="p-2" onSubmit={handleSearch}>
          <input
            className="m-2 search-input"
            type="text"
            name="city"
            placeholder="City"
            value={searchItems.city}
            onChange={handleChange}
          />
          <input
            className="m-2 search-input"
            type="text"
            name="state"
            placeholder="State"
            value={searchItems.state}
            onChange={handleChange}
          />

          <button className="m-2 btn btn-dark" type="submit">
            Search
          </button>
        </form>
      </nav>

      {!isLoaded && !hasSearched && (
        <Fade>
          <h5 className="m-5">
            Skyscape is a basic weather app built with React and OpenWeatherAPI.
            <br></br>
            <br></br>
            Use the search inputs above to see the current and upcoming weather.
          </h5>
        </Fade>
      )}

      {error && <div>Error: {error.message}</div>}

      {!isLoaded && hasSearched && (
        <Fade>
          <h2 className="m-5">Loading...</h2>
        </Fade>
      )}

      {isLoaded && (
        <div>
          <h1 className="m-5">{`${cityState.city}, ${cityState.state}`}</h1>
          <Fade>
            <div className="m-5">
              <Current current={current} hourly={hourly} />
            </div>
          </Fade>
          <Fade>
            <div className="mt-5">
              <Week week={week} />
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
}

export default App;
