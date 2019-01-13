// -*- coding: utf-8 -*-
// vim: syntax=javascript tabstop=2 shiftwidth=2

function nothing() {
  // Triggers don't like files with no named function.
  Logger.log("Nothing happened.\n");
};

Date.prototype.getWeekNumber = function() {
  // http://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
};

Date.prototype.yyyymmdd = function() {
  // http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};

// return first date in week of year
function getDateOfWeek(year, week) {
  var date = new Date(year,0,1);
  while (date.getWeekNumber() > 1) {// set to week 1
    date.setDate(date.getDate()+1);
  }
  return date.setDate(date.getDate() + 7*(week-1));
}

// return the date of the next occurance of weekDay in WeekNumber
// Example: if today is saturday week five, and the query is for sunday in week
// five, return the date of tomorrow.
// Example: if today is saturday week five, and the query is for friday in week
// five, return the date of the friday in week five next year.
function getDateOfNextWN(weekNumber, weekDay, year) {
  weekNumber = Math.round(weekNumber);
  if (typeof(weekDay) === 'undefined') weekDay = 0;
  weekDay = Math.round(weekDay);
  var today = new Date();
  if (typeof(year) === 'undefined') year = today.getFullYear();
  var date = new Date(year,0,1);
  // The first of Jan might be in the last week of previous year.
  // So let's fast forward until we are at week 1 of this year
  while (date.getWeekNumber() > 1) {
    date.setDate(date.getDate()+1);
  }
  // I subtract 1 because otherwise it is one day too much because of UTC
  date.setDate(date.getDate() + 7*(weekNumber-1) + weekDay - 1);
  if (date < today) {
    date = getDateOfNextWN(weekNumber, weekDay, today.getFullYear() + 1);
  }
  return date;
};

