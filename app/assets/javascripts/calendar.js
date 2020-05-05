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
        true // make the event "stick"
      );
      $ajax({
        type: "POST",
        url: "event/new",
        data: data,
        success: function(){
          calendar.fullCalendar("refetchEvent")
        }
      });
    }
    calendar.fullCalendar("unselect");
  }
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
    events: '/events.json',
    // eventClick: function(event) { //イベントをクリックしたときに実行
    //   var id = event.id
    //   var show_url = "/events/"+id
    //   location.href = show_url;
    // },
    // eventResize: function(event) { //イベントをサイズ変更した際に実行
    //   var id = event.id
    //   var update_url = "/api/v1/events/"+id
    //   var event_start_time = event._start._d
    //   var year = event_start_time.getYear() + 1900;
    //   var month = event_start_time.getMonth() + 1;
    //   var day   = event_start_time.getDate();
    //   var hour  = ( event_start_time.getHours()   < 10 ) ? '0' + event_start_time.getHours()   : event_start_time.getHours();
    //   var min   = ( event_start_time.getMinutes() < 10 ) ? '0' + event_start_time.getMinutes() : event_start_time.getMinutes();
    //   var moment_start = year+"-"+month+"-"+day+" "+hour+":"+min;
    //   var start_time = moment(moment_start).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
    //   var event_end_time = event._end._d
    //   var year = event_end_time.getYear() + 1900;
    //   var month = event_end_time.getMonth() + 1;
    //   var day   = event_end_time.getDate();
    //   var hour  = ( event_end_time.getHours()   < 10 ) ? '0' + event_end_time.getHours()   : event_end_time.getHours();
    //   var min   = ( event_end_time.getMinutes() < 10 ) ? '0' + event_end_time.getMinutes() : event_end_time.getMinutes();
    //   var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
    //   var end_time = moment(moment_end).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
    //   var data = {
    //     event: {
    //       title: event.title,
    //       start: start_time,
    //       end: end_time,
    //       allday: false
    //     }
    //   }
    //   $.ajax({
    //     type: "PATCH",
    //     url: update_url,
    //     data: data,
    //     success: function() {
    //       calendar.fullCalendar('refetchEvents');
    //     }
    //   });
    //   calendar.fullCalendar('unselect');
    // },
    // eventDrop: function(event) { //イベントをドラッグ&ドロップした際に実行
    //   var id = event.id
    //   var update_url = "/api/v1/events/"+id
    //   var event_start_time = event._start.d
    //   var year = event_start_time.getYear() + 1900;
    //   var month = event_start_time.getMonth() + 1;
    //   var day   = event_start_time.getDate();
    //   var hour  = ( event_start_time.getHours()   < 10 ) ? '0' + event_start_time.getHours()   : event_start_time.getHours();
    //   var min   = ( event_start_time.getMinutes() < 10 ) ? '0' + event_start_time.getMinutes() : event_start_time.getMinutes();
    //   var moment_start = year+"-"+month+"-"+day+" "+hour+":"+min;
    //   var start_time = moment(moment_start).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
    //   var event_end_time = event._end._d
    //   var year = event_end_time.getYear() + 1900;
    //   var month = event_end_time.getMonth() + 1;
    //   var day   = event_end_time.getDate();
    //   var hour  = ( event_end_time.getHours()   < 10 ) ? '0' + event_end_time.getHours()   : event_end_time.getHours();
    //   var min   = ( event_end_time.getMinutes() < 10 ) ? '0' + event_end_time.getMinutes() : event_end_time.getMinutes();
    //   var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
    //   var end_time = moment(moment_end).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
    //   var data = {
    //     event: {
    //       title: event.title,
    //       start: start_time,
    //       end: end_time,
    //       allday: false
    //     }
    //   }
    //   $.ajax({
    //     type: "PATCH",
    //     url: update_url,
    //     data: data,
    //     success: function() {
    //       calendar.fullCalendar('refetchEvents');
    //     }
    //   });
    //   calendar.fullCalendar('unselect');
    // }
  });
  // calendar.render();
});
