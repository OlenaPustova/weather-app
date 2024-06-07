export function getNameDay(time) {
  // console.log(time);
  const timeMs = String(time).length == 10 ? Number(time + "000") : time;
  const date = new Date(timeMs);
  const numberDay = date.getDay();
  let day = "";
  switch (numberDay) {
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday ";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    case 0:
      day = "Sunday";
      break;
    default:
      return;
  }

  return day;
}

export function getNumberDay(time) {
  // console.log(time);

  const timeMs = String(time).length == 10 ? Number(time + "000") : time;
  const date = new Date(timeMs);
  return date.getDate();
}

export function getNameMounth(time) {
  // console.log(time);

  const timeMs = String(time).length == 10 ? Number(time + "000") : time;
  const date = new Date(timeMs);
  const numberMonth = date.getMonth();
  let mounth = "";
  switch (numberMonth) {
    case 0:
      mounth = "Jan";
      break;
    case 1:
      mounth = "Feb";
      break;
    case 2:
      mounth = "Mar";
      break;
    case 3:
      mounth = "Apr";
      break;
    case 4:
      mounth = "May";
      break;
    case 5:
      mounth = "June";
      break;
    case 6:
      mounth = "July";
      break;
    case 7:
      mounth = "Aug";
      break;
    case 8:
      mounth = "Sep";
      break;
    case 9:
      mounth = "Oct";
      break;
    case 10:
      mounth = "Nov";
      break;
    case 11:
      mounth = "Dec";
      break;
    default:
      return;
  }
  return mounth;
}
