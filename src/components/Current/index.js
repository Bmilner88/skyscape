import React from "react";
import Card from "react-bootstrap/Card";
import {
  hours,
  uviColor,
  precipitation,
  capitalizeFirstLetter,
} from "../../utils/helpers";

function Current({ current, hourly, alerts }) {
  return (
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-sm-auto col-lg-6 mb-3">
            <h2 className="m-4">{`Current Temp: ${current.temp.toFixed()}°F`}</h2>
            <h6 className="mt-4">{`Feels Like: ${current.feels_like.toFixed()}°F`}</h6>
        
            <h2 className="m-4">
              {current.weather[0].main}
              <span>
                <img
                  src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </span>
            </h2>
            <h6>{capitalizeFirstLetter(current.weather[0].description)}</h6>
            <h6 className="m-4">
              <span className={`p-1 rounded bg-${uviColor(current.uvi)}`}>
                UV Index: {current.uvi}
              </span>
            </h6>
    
            <h2 className="m-4">Wind Speed: {current.wind_speed}mph</h2>
            <h6 className="mt-4">Humidity: {current.humidity}%</h6>
          </div>

          {hourly && (
            <div className="col-lg-6 col-sm-auto mb-3">
              <Card>
                <Card.Header>
                  <Card.Title>
                    <h4>12 Hour Forecast</h4>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="container-fluid py-2">
                    <div className="d-flex flex-row flex-nowrap overflow-auto">
                      {hourly.map((hour) => (
                        <div className="m-4">
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
                </Card.Body>
              </Card>
            </div>
          )}
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
    </div>
  );
}

export default Current;
