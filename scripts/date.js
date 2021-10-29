var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var day_n = weekday[d.getDay()];
var m = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var month_n = m[d.getMonth()];
var date_n = String(d.getDate()) + " " + String(month_n);
var hour = d.getHours();

module.exports = {
    day_n,
    date_n,
    hour
}