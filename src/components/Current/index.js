import React from "react";

function Current({ current }) {
  return (
    <div className="card" id="weatherCard">
      <div className="card-body">
        <div className="card-title">Local Weather</div>
        <div className="card-text">
          <div>{`Current Temp: ${current.temp}°`}</div>
          <div>
            {`Weather today:  ${current.weather[0].main}`}
            <img
              src={`https://openweathermap.org/img/w/${current.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Current;
