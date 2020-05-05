$(document).ready(function() {
  var select = function(start, end, allDay) {
    var title = window.prompt("new title", event.title);
    var data = {event: {title: title, start: start, end: end, allDay: allDay}};
    event.start = moment(event.start).format('YYYY-MM-DD HH:mm:00');
    event.end = moment(event.end).format('YYYY-MM-DD HH:mm:00');
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
    header: {
      right: 'title',
      left: 'prev,next, today',
      center: 'month,agendaWeek,agendaDay'
    },
    buttonText: {
      prev: "<",
      next: ">"
    },
    height: 750,
    select: select,
    navLinks: true,
    editable: true,
    selectable: true,
    eventLimit: true,
    selectHelper: true,
    businessHours: true,
    ignoreTimezone: false,
    timeZone: 'Asia/Tokyo',
    events: '/events.json'
  });
  // calendar.render();
});

// document.addEventListener('DOMContentLoaded', function() {
//   var calendarEl = document.getElementById('calendar');

//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     plugins: [ 'dayGrid' ],
//     events: '/events.json',
//     selectable: true,
//     editable: true,
//     navLinks: true,
//     defaultView: 'dayGridMonth',
//     locale: 'ja',
//     businessHours: true
//   });

//   calendar.render();
// });
