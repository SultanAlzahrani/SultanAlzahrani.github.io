export function getTodayDate() {
  const today = new Date();
  // Extract year, month, and day components
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-based
  const day = today.getDate();

  // Format the date as YYYY-MM-DD
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;
  return formattedDate;
}

export function isToday(dateString) {
  // Extract year, month, and day components for both dates

  const date1 = new Date(dateString);
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  const date2 = new Date();
  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  // Check if both dates have the same year, month, and day
  return year1 === year2 && month1 === month2 && day1 === day2;
}
export function isDateInNext7Days(givenDate) {
  // Create a Date object for the given date
  const givenDateObject = new Date(givenDate);

  // Create a Date object for the current system date
  const currentDateObject = new Date();

  // Calculate the difference in days
  const timeDifference =
    givenDateObject.getTime() - currentDateObject.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // Check if the difference is less than or equal to 7
  return daysDifference <= 7;
}
