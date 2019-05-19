// define defalut value that use to calculate
const baseDate = { day: "Monday", date: 1, month: 1, year: 1900 };
//   const thirtyOneMonth = [1,3,5,7,8,10,12]
const thirtyMonth = [4, 6, 9, 11];
const months = {
  fullname: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  shortname: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ],
  number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
};
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

function main() {
  let date = document.querySelector("#date").value;
  let month = document.querySelector("#month").value;
  let year = document.querySelector("#year").value;
  let result = document.querySelector("#result");
  try {
    if (date && month && year) {
      let startDay = calculateStartYearDay(year);
      console.log("startDay : ", startDay);
      let day = findDay(date, startDay, month, year);

      result.innerHTML = `${days[day]}`;
    } else {
      throw new Error("type of date , month , year is error");
    }
  } catch (err) {
    console.error(err);
  }
}

//   find start day of that year and calculate how many time to plus and divide with 7 to get start day of that year
function calculateStartYearDay(year) {
  let { year: baseYear, day } = baseDate;
  //   find round to calculate start date
  let yearRound = year - baseYear;
  // set startday with basevalue
  let times = days.indexOf(day);
  for (i = 0; i < yearRound; i++) {
    console.log("yearRound :", yearRound);
    times = times + (isLeapYear(baseYear + i) ? 2 : 1);
  }
  times = times % 7;
  // this will return index of day 0 => monday
  console.log("times :", times);
  return times;
}

// findDay with start day of that year and year
function findDay(date, startday, month, year) {
  let monthIndex = getMonthIndex(month);
  console.log("startday :", startday);
  // data to stack of day that pass in year
  let _day = 0;
  // month loob and then when it match that month will plus date
  for (i = 0; i <= monthIndex; i++) {
    console.log("i : ", i);
    console.log("day is :", _day);
    if (i == monthIndex) {
      console.log("day is :", _day);
      // -1 because we delete the first day of year that we already calculate to startday
      // startday it remember of start day of that year
      let totalDay = (Number(date) + _day - 1 + startday) % 7;
      console.log("totalDay is :", totalDay);
      return totalDay;
    } else if (thirtyMonth.indexOf(i + 1) !== -1) {
      console.log("thirty month");
      _day = _day + 30;
    } else if (i + 1 == 2) {
      console.log("month 2");
      plusLeap = isLeapYear(year) ? 29 : 28;
      _day = _day + plusLeap;
    } else {
      console.log("thirty one month");
      _day = _day + 31;
    }
  }
}

// getMonth Index
function getMonthIndex(month) {
  // check month that match with full name or short name and string
  if (months.fullname.indexOf(month) !== -1) {
    return months.fullname.indexOf(month);
  } else if (months.shortname.indexOf(month) !== -1) {
    return months.shortname.indexOf(month);
  } else if (months.number.indexOf(Number(month)) !== -1) {
    return months.number.indexOf(Number(month));
  } else {
    throw new Error("month not valid");
  }
}

//   check year input that is leap year
function isLeapYear(year) {
  // leap year must be divide mod with 4 === 0
  if (year % 4 === 0) {
    //leap year must be divide mod with 100 !== 0
    if (year % 100 === 0) {
      // but if that year can mod with 400 === 0 It is leap year
      if (year % 400 === 0) {
        return true;
      }
      return false;
    }
    return true;
  }
  // it not leap year
  else {
    return false;
  }
}
