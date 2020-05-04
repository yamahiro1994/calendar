// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require moment
//= require rails-ujs
//= require fullcalendar
//= require fullcalendar/lang/ja
//= require activestorage
//= require_tree.

$(document).ready(function() {
  var select = function(start, end, allDay) {
    var title = window.prompt("title");
    var data = {event: {title: title, start: start, end: end, color: color, allDay: allDay}};
    $.ajax({
        type: "POST",
        url: '/events',
        data: data,
        success: function() {
          calendar.fullCalendar('refetchEvents');
        }
    });
    calendar.fullCalendar('unselect');
  };

  var calendar = $('#calendar').fullCalendar({
    events: '/events.json',
    selectable: true,
    selectHelper: true,
    ignoreTimezone: false,
    select: select
  });
});