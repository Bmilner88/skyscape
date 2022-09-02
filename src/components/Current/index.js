import React from "react";
import { Card, OverlayTrigger, Popover, Carousel } from "react-bootstrap";
import {
  hours,
  uviColor,
  precipitation,
  capitalizeFirstLetter,
} from "../../utils/helpers";

function Current({ current, hourly, alerts }) {
  const alertPopover = (
    <Popover id="alert-popover" className="alertPopover">
      {alerts && (
        <div>
          {alerts.length > 1 && (
            <Carousel variant="dark">
              {alerts.map((alert) => (
                <Carousel.Item>
                  <Popover.Body className="mx-5 mb-3">
                    <h5 className="mb-2">{alert.event}</h5>
                    <hr />
                    <h6>Description:</h6>
                    <p>{`${alert.description}`}</p>
                    <h6 className="mt-2">Instruction:</h6>{" "}
                    {`Inexperienced mariners, especially those operating smaller\nvessels, should avoid navigating in hazardous conditions.`}
                    <h6 className="mt-2">Severity: </h6>
                    <p>Minor</p>
                    <h6 className="mt-2">Start: </h6>
                    <p>{hours(new Date(alert.start * 1000).getHours())}</p>
                    <h6 className="mt-2">End: </h6>
                    <p>{hours(new Date(alert.end * 1000).getHours())}</p>
                  </Popover.Body>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          <Popover.Body className="mx-5 mb-3">
            <h5 className="mb-2">{alerts[0].event}</h5>
            <hr />
            <h6>Description:</h6>
            <p>{`${alerts[0].description}`}</p>
            <h6 className="mt-2">Instruction:</h6>{" "}
            {`Inexperienced mariners, especially those operating smaller\nvessels, should avoid navigating in hazardous conditions.`}
            <h6 className="mt-2">Severity: </h6>
            <p>Minor</p>
            <h6 className="mt-2">Start: </h6>
            <p>{hours(new Date(alerts[0].start * 1000).getHours())}</p>
            <h6 className="mt-2">End: </h6>
            <p>{hours(new Date(alerts[0].end * 1000).getHours())}</p>
          </Popover.Body>
        </div>
      )}
    </Popover>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm col-lg-6">
          <Card className="mb-5">
            <Card.Header>
              <Card.Title>
                <h4>Current Weather</h4>
              </Card.Title>
            </Card.Header>
            <h3 className="mt-4">
              Current Temp:{" "}
              <span className="border border-2 rounded p-1">{`${current.temp.toFixed()}°F`}</span>
            </h3>
            <h5 className="mt-2">
              Feels Like:{" "}
              <span className="border border-2 rounded p-1">{`${current.feels_like.toFixed()}°F`}</span>
            </h5>
            <h2>
              {current.weather[0].main}
              <br />
              <span>
                <img
                  src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </span>
            </h2>
            <h6>{capitalizeFirstLetter(current.weather[0].description)}</h6>
            <h6>Humidity: {current.humidity}%</h6>
            <h6>Wind Speed: {current.wind_speed}mph</h6>
            {alerts ? (
              <div>
                <h6>
                  <span className={`p-1 rounded bg-${uviColor(current.uvi)}`}>
                    UV Index: {current.uvi}
                  </span>
                </h6>
                <OverlayTrigger
                  trigger="click"
                  placement="top"
                  overlay={alertPopover}
                >
                  <button className="btn btn-danger my-4">Weather Alert</button>
                </OverlayTrigger>
              </div>
            ) : (
              <h6 className="mt-1 mb-4">
                <span className={`p-1 rounded bg-${uviColor(current.uvi)}`}>
                  UV Index: {current.uvi}
                </span>
              </h6>
            )}
          </Card>
        </div>

        {hourly && (
          <div className="col-lg-6 col-sm-auto d-flex mb-5 justify-content-center">
            <Card>
              <Card.Header>
                <Card.Title>
                  <h4>12 Hour Forecast</h4>
                </Card.Title>
              </Card.Header>
              <Card.Body className="py-5">
                <div className={`container-fluid ${alerts ? " py-5" : ""}`}>
                  <div className="d-flex flex-row flex-nowrap overflow-auto justify-content-between">
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
    </div>
  );
}

export default Current;
