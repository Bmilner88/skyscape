import React from "react";

function Current({ current, hourly }) {
  function hours(hour) {
    const suffix = hour >= 12 ? " PM":" AM";
    return ((hour + 11) % 12 + 1) + suffix;
  };

  return (
    <div>
      <div>{`Current Temp: ${current.temp.toFixed()}°`}</div>
      <div>
        {`Weather today:  ${current.weather[0].main}`}
        <img
          src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
          alt="weather icon"
        />
        <div className="container">
          <div className="row">
            {hourly &&
              hourly.map((hour) => (
                <div className="col-sm">
                  {hours(new Date(hour.dt * 1000).getHours())}{" "}
                  {hour.weather[0].main}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Current;
