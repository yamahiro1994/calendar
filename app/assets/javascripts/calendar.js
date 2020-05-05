$(document).ready(function() {
  select = function(start, end, allDay) {
    var title = window.prompt("title:");
    if (title){
      calendar.fullCalendar("renderEvent",
        {
          title: title,
          start: start,
          end: end,
          allDay: allDay
        },
        true // event "stick" 作成
      );
      $ajax({
        type: "POST",
        url: "event/new",
        data: { id: id },
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function(){
          calendar.fullCalendar("refetchEvent")
        }
      });
    }
    calendar.fullCalendar("unselect");
  }
  var calendar = $('#calendar').fullCalendar({
    header: {
      left: 'prev,next, today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
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
    events: '/events.json',
  });
  // calendar.render();
});
