$(document).ready(function() {
  var select = function(start, end) {
    var title = window.prompt("title");
    start_time = start.unix()
    var d = new Date( start_time * 1000 );
    var year = d.getYear() + 1900;
    var month = d.getMonth() + 1;
    var day   = d.getDate();
    var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var moment_start = year+"-"+month+"-"+day+" "+hour+":"+min;
    var start_time = moment(moment_start).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
    end_time = end.unix()
    var d = new Date( end_time * 1000 );
    var year = d.getYear() + 1900;
    var month = d.getMonth() + 1;
    var day   = d.getDate();
    var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
    var end_time = moment(moment_end).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
    var data = {
      event: {
        title: title,
        start: start_time,
        end: end_time,
        allday: false
      }
    }
    $.ajax({
     type: "POST",
     url: "/events",
     data: data,
     success: function() {
       calendar.fullCalendar('refetchEvents');
     }
    });
    calendar.fullCalendar('unselect');
  };
  var calendar = $('#calendar').fullCalendar({
    header: {
      center: 'title',
      left: 'prev,next, today',
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
});
