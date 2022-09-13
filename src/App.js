import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Fade } from "react-awesome-reveal";

import Header from "./components/Header";
import Current from "./components/Current";
import Week from "./components/Week";

import "./App.css";

const W_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [searchItems, setSearchItems] = useState({
    city: "",
    state: "",
  });
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [cityState, setCityState] = useState({ city: "", state: "" });
  const [current, setCurrent] = useState();
  const [week, setWeek] = useState();
  const [hourly, setHourly] = useState();
  const [alerts, setAlerts] = useState();
  const [air, setAir] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchItems({
      ...searchItems,
      [name]: value,
    });
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchItems.city && !searchItems.state) {
      return;
    }

    setIsLoaded(false);
    setHasSearched(true);

    await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchItems.city.toLowerCase()},${
        searchItems.state
      },US&appid=${W_API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCityState({ city: `${json[0].name}`, state: `${json[0].state}` });
        Promise.all([
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${json[0].lat}&lon=${json[0].lon}&exclude=minutely&units=imperial&appid=${W_API_KEY}`
          ).then((res) => res.json()),
          fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${json[0].lat}&lon=${json[0].lon}&appid=${W_API_KEY}`
          ).then((res) => res.json()),
        ]).then(
          (result) => {
            console.log(result[1].list[0])
            setIsLoaded(true);
            setCurrent(result[0].current);
            setWeek(result[0].daily.splice(1, 7));
            setHourly(result[0].hourly.splice(2, 12));
            setAlerts(result[0].alerts);
            setAir(result[1].list[0])
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
      <nav className="app-header pb-4 pt-2">
        <form
          class="row m-0 g-3 align-items-center justify-content-center"
          onSubmit={handleSearch}
        >
          <div class="col-auto">
            <input
              className="form-control"
              id="city"
              type="text"
              name="city"
              placeholder="City"
              value={searchItems.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-auto">
            <select
              className="form-select"
              id="state"
              name="state"
              value={searchItems.state}
              onChange={handleChange}
            >
              <option style={{ color: "gray" }} value="">
                Select State
              </option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div className="col-auto">
            <button className="btn btn-dark" type="submit">
              Search
            </button>
          </div>
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
          <h2 className="m-5 text-center">
            Loading{" "}
            <span>
              <Spinner className="m-0" animation="border" as="h6" />
            </span>
          </h2>
        </Fade>
      )}

      {isLoaded && (
        <div>
          <h1 className="m-5">{`${cityState.city}, ${cityState.state}`}</h1>
          <Fade>
            <div>
              <Current current={current} hourly={hourly} alerts={alerts} air={air}/>
            </div>
          </Fade>
          <Fade>
            <div className="mb-5">
              <Week week={week} />
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
}

export default App;
