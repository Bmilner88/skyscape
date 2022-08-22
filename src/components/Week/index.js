import React from "react";

function Week({ week }) {
  return (
    <div className="container">
      <div className="row">
        {week &&
          week.map((day) => (
            <div className="card m-2 col-sm">
              <div className="card-body">
                <div className="card-title">
                  <h5>{new Date(day.dt * 1000).toLocaleDateString().slice(0, 4)}</h5>
                  <h6>{`${day.weather[0].main}`}</h6>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt="weather icon"
                  />
                </div>
                <h6>{`Day ${day.temp.day.toFixed()}°`}</h6>
                <h6>{`Night ${day.temp.night.toFixed()}°`}</h6>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Week;
