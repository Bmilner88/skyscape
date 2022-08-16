import React from "react";

function Current({ current }) {
  return (
    <div>
      <div>{`Current Temp: ${current.temp}°`}</div>
      <div>
        {`Weather today:  ${current.weather[0].main}`}
        <img
          src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
          alt="weather icon"
        />
      </div>
    </div>
  );
}

export default Current;
