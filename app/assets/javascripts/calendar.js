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
    axisFormat: 'H:mm',
    timeFormat: 'H:mm',
    select: select,
    height: 800,
    firstDay: 0,                           // 0:日曜日から表示
    firstHour: 9,
    navLinks: true,
    editable: true,                        // イベントのドラッグが可能
    weekends: true,                        // 土曜、日曜を表示
    slotMinutes: 15,                       // スロットの分
    snapMinutes: 15,                       // 選択する時間間隔
    selectable: true,
    eventLimit: true,
    eventLimit: true,                      // イベントが多すぎる場合は「詳細」リンクを許可する
    weekMode: 'fixed',                     // 週モード (fixed, liquid, variable)
    allDaySlot: false,                     // 終日スロットを非表示
    weekNumbers: false,                    // 週数を表示
    selectHelper: true,
    businessHours: true,
    minTime: "00:00:00",                   // スケジュールの開始時間
    maxTime: "24:00:00",                   // スケジュールの最終時間
    allDayText:'allday',                   // 終日スロットのタイトル
    defaultView: 'month',
    ignoreTimezone: false,
    timeZone: 'Asia/Tokyo',
    events: '/events.json',
    slotDuration: '00:30:00',              // 表示する時間軸の細かさ
    snapDuration: '00:15:00',              // スケジュールをスナップするときの動かせる細かさ
    defaultTimedEventDuration: '10:00:00', // 画面上に表示する初めの時間(スクロールされている場所)

    eventClick: function(event) { //イベントをクリックしたときに実行
      var id = event.id
      var show_url = "/events/"+id
      location.href = show_url;
    },
    eventResize: function(event) { //イベントをサイズ変更した際に実行
      var id = event.id
      var update_url = "/events/"+id
      var event_start_time = event._start._d
      var year = event_start_time.getYear() + 1900;
      var month = event_start_time.getMonth() + 1;
      var day   = event_start_time.getDate();
      var hour  = ( event_start_time.getHours()   < 10 ) ? '0' + event_start_time.getHours()   : event_start_time.getHours();
      var min   = ( event_start_time.getMinutes() < 10 ) ? '0' + event_start_time.getMinutes() : event_start_time.getMinutes();
      var moment_start = year+"-"+month+"-"+day+" "+hour+":"+min;
      var start_time = moment(moment_start).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
      var event_end_time = event._end._d
      var year = event_end_time.getYear() + 1900;
      var month = event_end_time.getMonth() + 1;
      var day   = event_end_time.getDate();
      var hour  = ( event_end_time.getHours()   < 10 ) ? '0' + event_end_time.getHours()   : event_end_time.getHours();
      var min   = ( event_end_time.getMinutes() < 10 ) ? '0' + event_end_time.getMinutes() : event_end_time.getMinutes();
      var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
      var end_time = moment(moment_end).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
      var data = {
        event: {
          title: event.title,
          start: start_time,
          end: end_time,
          allday: false
        }
      }
      $.ajax({
        type: "PATCH",
        url: update_url,
        data: data,
        success: function() {
          calendar.fullCalendar('refetchEvents');
        }
      });
        calendar.fullCalendar('unselect');
    },
    eventDrop: function(event) { //イベントをドラッグ&ドロップした際に実行
      var id = event.id
      var update_url = "/events/"+id
      var event_start_time = event._start._d
      var year = event_start_time.getYear() + 1900;
      var month = event_start_time.getMonth() + 1;
      var day   = event_start_time.getDate();
      var hour  = ( event_start_time.getHours()   < 10 ) ? '0' + event_start_time.getHours()   : event_start_time.getHours();
      var min   = ( event_start_time.getMinutes() < 10 ) ? '0' + event_start_time.getMinutes() : event_start_time.getMinutes();
      var moment_start = year+"-"+month+"-"+day+" "+hour+":"+min;
      var start_time = moment(moment_start).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
      var event_end_time = event._end._d
      var year = event_end_time.getYear() + 1900;
      var month = event_end_time.getMonth() + 1;
      var day   = event_end_time.getDate();
      var hour  = ( event_end_time.getHours()   < 10 ) ? '0' + event_end_time.getHours()   : event_end_time.getHours();
      var min   = ( event_end_time.getMinutes() < 10 ) ? '0' + event_end_time.getMinutes() : event_end_time.getMinutes();
      var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
      var end_time = moment(moment_end).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
      var data = {
        event: {
          title: event.title,
          start: start_time,
          end: end_time,
          allday: false
        }
      }
      $.ajax({
        type: "PATCH",
        url: update_url,
        data: data,
        success: function() {
          calendar.fullCalendar('refetchEvents');
        }
      });
      calendar.fullCalendar('unselect');
    },
    eventRender: function (event, element) {
      element.attr('href', 'javascript:void(0);');
      element.click(function() {
        $("#startTime").html(moment(event.start).format('MMM Do h:mm A'));
        $("#endTime").html(moment(event.end).format('MMM Do h:mm A'));
        $("#eventInfo").html(event.description);
        $("#eventLink").attr('href', event.url);
        $("#eventContent").dialog({ modal: true, title: event.title, width:350});
      });
    }
  });
});
