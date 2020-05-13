$(document).ready(function() {
  var select = function(start, end, allday) {
    start_time = start.unix()
    var d = new Date( start_time * 1000 );
    var year = d.getYear() + 1900;
    var month = d.getMonth() + 1;
    var day   = d.getDate();
    var year = moment(start).year();
    var month = moment(start).month()+1; //1月が0のため+1する
    var day = moment(start).date();
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
    var year = moment(start).year();
    var month = moment(start).month()+1; //1月が0のため+1する
    var day = moment(start).date();
    // allday =
    var data = {
      event: {
        title: title,
        start: start_time,
        end: end_time,
        allDay: allday,
        memo: memo
      }
    }
    $.ajax({
      type: "POST",
      url: "/events",
      data: data,
      success: function() {
        calendar.fullCalendar('refetchEvents');
        alert("予定を登録しました。")
      }
    })
      calendar.fullCalendar('unselect');
  };
  var calendar = $('#calendar').fullCalendar({
    header: {
      center: 'title',
      left: 'prev,next, today',
      right: 'month,agendaWeek,agendaDay, list'
    },
    buttonText: {
      prev: "<",
      next: ">"
    },
    plugins: ['bootstrap','timegrid', 'list'],
    axisFormat: 'H:mm',
    timeFormat: 'H:mm',
    select: select,
    height: 800,
    firstDay: 0,                           // 0:日曜日から表示
    firstHour: 9,
    navLinks: true,
    editable: true,                        // イベントのドラッグが可能
    weekends: true,                        // 土曜、日曜を表示
    aditable: true,                        //trueでスケジュールを編集可能にする
    slotMinutes: 15,                       // スロットの分
    snapMinutes: 15,                       // 選択する時間間隔
    droppable: true,
    allDaySlot: true,
    selectable: true,
    eventLimit: true,
    eventLimit: true,                      // イベントが多すぎる場合は「詳細」リンクを許可する
    weekMode: 'fixed',                     // 週モード (fixed, liquid, variable)
    allDaySlot: false,                     // 終日スロットを非表示
    weekNumbers: false,                    // 週数を表示
    selectHelper: true,
    minTime: "00:00:00",                   // スケジュールの開始時間
    maxTime: "24:00:00",                   // スケジュールの最終時間
    allDayText:'allday',                   // 終日スロットのタイトル
    defaultView: 'month',
    ignoreTimezone: true,
    timeZone: 'Asia/Tokyo',
    events: '/events.json',
    slotDuration: '00:30:00',              // 表示する時間軸の細かさ
    snapDuration: '00:15:00',              // スケジュールをスナップするときの動かせる細かさ
    defaultTimedEventDuration: '10:00:00', // 画面上に表示する初めの時間(スクロールされている場所)

    //モーダル入力フォーム表示
    select: function(start, end, allDay) {
      endtime = $.fullCalendar.formatDate(end,'h:mm tt');
      starttime = $.fullCalendar.formatDate(start,'ddd, MMM d, h:mm tt');
      var mywhen = starttime + ' - ' + endtime;
      $('#createEventModal #apptStartTime').val(start);
      $('#createEventModal #apptEndTime').val(end);
      $('#createEventModal #apptAllDay').val(allDay);
      $('#createEventModal #when').text(mywhen);
      $('#createEventModal').modal('show');
    },
  });
});
//modal以外クリックで閉じる
// $('#calendar').click(function(event){
//   console.log('ok')
//   var clickedElement = $(event.target);
//   if($(clickedElement).hasClass('.modal-backdrop.in')){
//     $('.body').fadeOut(500);
//   }
// });