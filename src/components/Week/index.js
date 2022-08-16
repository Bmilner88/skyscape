import React from "react";

function Week({ week }) {
  return (
    <div className="container">
      <div className="row">
        {week &&
          week.map((day) => (
            <div className="card col-sm">
              <div className="card-title">
                {new Date(day.dt * 1000).toLocaleDateString()}
              </div>
              <div className="card-body">
                <p>
                  {`${day.weather[0].main}`}
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt="weather icon"
                  />
                </p>
                <p>{`Day ${day.temp.day}°`}</p>
                <p>{`Night ${day.temp.night}°`}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Week;
