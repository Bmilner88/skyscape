import React from "react";

function Current({ current, hourly }) {
  function hours(hour) {
    const suffix = hour >= 12 ? " PM" : " AM";
    return ((hour + 11) % 12) + 1 + suffix;
  }

  function uviColor(uvi) {
    if (uvi <= 3) {
      return "success";
    } else if (uvi >= 3 && uvi <= 5) {
      return "warning";
    } else {
      return "danger";
    }
  }

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
            <h6 className="mt-3">
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

      <div>
        <div className="container pt-5">
          <div className="row">
            <h4 className="mb-4">10 Hour Forecast</h4>
            {hourly &&
              hourly.map((hour) => (
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
                  <h6>{`${hour.temp.toFixed()}°`}</h6>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Current;
