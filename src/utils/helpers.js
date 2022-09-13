export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function hours(hour) {
  const suffix = hour >= 12 ? " PM" : " AM";
  return ((hour + 11) % 12) + 1 + suffix;
}

export function dayOfWeek(num) {
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

export function precipitation(weather) {
  switch (weather) {
    case "Thunderstorm":
      return true;
    case "Drizzle":
      return true;
    case "Rain":
      return true;
    case "Snow":
      return true;
    default:
      return false;
  }
}

export function uviColor(uvi) {
  if (uvi <= 3) {
    return "success";
  } else if (uvi >= 3 && uvi <= 5) {
    return "warning";
  } else {
    return "danger";
  }
}

export function aqiColor(aqi) {
  switch (aqi) {
    case 1:
      return "success";
    case 2:
      return "success";
    case 3:
      return "warning";
    case 4:
      return "warning";
    default:
      return "danger";
  }
}