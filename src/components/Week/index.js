import React from "react";

function Week({ week }) {
  function dayOfWeek(num) {
    switch (num) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return;
    }
  }

  return (
    <div className="container p-5">
      <div className="row">
        <h3>7-day Forecast</h3>
        {week &&
          week.map((day) => (
            <div className="m-2 col-sm">
              <h5 className="">
                {dayOfWeek(new Date(day.dt * 1000).getDay())}
                <br></br>
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
