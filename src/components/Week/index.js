import React from "react";
import Card from "react-bootstrap/Card";
import { dayOfWeek, precipitation } from "../../utils/helpers";

function Week({ week }) {
  return (
    <div className="container">
      <div className="row align-items-center">
        {week && (
          <div className="col-sm-auto col-lg-12">
            <Card>
              <Card.Header className="bg-dark">
                <Card.Title className="m-0">
                  <h4 className="text-white m-0">7 Day Forecast</h4>
                </Card.Title>
              </Card.Header>
              <Card.Body className="weather-card">
                <div className="container-fluid py-2">
                  <div className="d-flex flex-row flex-nowrap overflow-auto justify-content-between align-items-top">
                    {week.map((day) => (
                      <div className="m-4">
                        <h6>
                          {dayOfWeek(new Date(day.dt * 1000).getDay())}
                          <br></br>
                          {new Date(day.dt * 1000).getMonth() + 1}/
                          {new Date(day.dt * 1000).getDate()}
                        </h6>
                        <h6>
                          <span>
                            <img
                              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                              alt="weather icon"
                            />
                          </span>
                          <br></br>
                          {`${day.weather[0].main}`}
                        </h6>
                        <h6>{`High: ${day.temp.day.toFixed()}°F`}</h6>
                        <h6>{`Low: ${day.temp.night.toFixed()}°F`}</h6>
                        <h6 className="text-muted">
                          {precipitation(day.weather[0].main) &&
                            `${(day.pop * 100).toFixed()}%`}
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
    </div>
  );
}

export default Week;
