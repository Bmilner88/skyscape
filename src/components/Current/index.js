import React from "react";
import { hours, uviColor, precipitation, capitalizeFirstLetter } from "../../utils/helpers";

function Current({ current, hourly, alerts }) {
  return (
    <div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <h2>{`Current Temp: ${current.temp.toFixed()}°F`}</h2>
            <h6 className="mt-4">{`Feels Like: ${current.feels_like.toFixed()}°F`}</h6>
          </div>

          <div className="col">
            <h2>
              {current.weather[0].main}
              <span>
                <img
                  src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </span>
            </h2>
            <h6>
              {capitalizeFirstLetter(current.weather[0].description)}
            </h6>
            <h6 className="mt-4">
              <span className={`p-1 rounded bg-${uviColor(current.uvi)}`}>
                UV Index: {current.uvi}
              </span>
            </h6>
          </div>

          <div className="col">
            <h2 className="">Wind Speed: {current.wind_speed}mph</h2>

            <h6 className="mt-4">Humidity: {current.humidity}%</h6>
          </div>
        </div>
      </div>

      {alerts && (
        <div className="container pt-5">
          <div className="row">
            {alerts.map((alert) => (
              <div className="col">
                <h4>{alert.event}</h4>
                <p>{`${alert.description}`}</p>
                <h6>Start: {hours(new Date(alert.start * 1000).getHours())}</h6>
                <h6>End: {hours(new Date(alert.end * 1000).getHours())}</h6>
              </div>
            ))}
          </div>
        </div>
      )}

      {hourly && (
        <div className="container pt-5">
          <div className="row">
            <h4 className="mb-4">10 Hour Forecast</h4>
            {hourly.map((hour) => (
              <div className="col-sm">
                <h6>
                  {hours(new Date(hour.dt * 1000).getHours())}
                  <span>
                    <img
                      src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                      alt="weather icon"
                    />
                  </span>
                </h6>
                <h6>{hour.weather[0].main}</h6>
                <h6>{`${hour.temp.toFixed()}°F`}</h6>
                <h6>
                  {precipitation(hour.weather[0].main) &&
                    `${(hour.pop * 100).toFixed()}%`}
                </h6>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Current;
