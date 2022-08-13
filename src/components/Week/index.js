import React from "react";

function Week({ week }) {
  return (
    <div>
      {week &&
        week.map(day => (
          <div>
            <div>{`Day Temp: ${day.temp.day}°`}</div>
          </div>
        ))}
    </div>
  );
}

export default Week;
