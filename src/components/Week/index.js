import React from "react";
import { dayOfWeek } from "../../utils/helpers";

function Week({ week }) {
  return (
    <div className="container p-5">
      <div className="row">
        <h3 className="mb-4">7-day Forecast</h3>
        {week &&
          week.map((day) => (
            <div className="m-2 col-sm">
              <h5>
                {dayOfWeek(new Date(day.dt * 1000).getDay())}
                <br></br>
                {new Date(day.dt * 1000).toLocaleDateString().slice(0, 4)}
              </h5>
              <h6>{`${day.weather[0].main}`} </h6>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt="weather icon"
              />
              <h6>{`High: ${day.temp.day.toFixed()}°F`}</h6>
              <h6>{`Low: ${day.temp.night.toFixed()}°F`}</h6>
              <h6>
                {(day.weather[0].main === "Rain" ||
                  day.weather[0].main === "Snow") &&
                  `${(day.pop * 100).toFixed()}%`}
              </h6>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Week;
