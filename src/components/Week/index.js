import React from "react";

function Week({ week }) {
  return (
    <div className="container p-5">
      <div className="row">
        <h3>7-day Forecast</h3>
        {week &&
          week.map((day) => (
            <div className="m-2 col-sm">
              <h5 className="">
                {new Date(day.dt * 1000).toLocaleDateString().slice(0, 4)}
              </h5>
              <h6 className="">{`${day.weather[0].main}`}</h6>
              <img
                className=""
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt="weather icon"
              />

              <h6>
                {`High: ${day.temp.day.toFixed()}°`}
                <br></br>
                {`Low: ${day.temp.night.toFixed()}°`}
              </h6>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Week;
