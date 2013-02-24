var d3_time_interval = require("./interval")._interval,
    d3_time = require("./time")._time;

var D3TimeHour = d3_time_interval(function(date) {
  var timezone = date.getTimezoneOffset() / 60;
  return new d3_time((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 36e5); // DST breaks setHours
}, function(date) {
  return date.getHours();
});

D3TimeHour.s = D3TimeHour.range;
D3TimeHour.s.utc = D3TimeHour.utc.range;

module.exports = D3TimeHour;
