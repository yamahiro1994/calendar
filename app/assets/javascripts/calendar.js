$(document).ready(function() {
  var select = function(start, end) {
    var data = {
      event: {
        title: title,
        start: start,
        end: end,
        memo: memo
      }
    }

    $.ajax({
      type: "POST",
      url: "/events",
      data: data,
      success: function() {
        calendar.fullCalendar('refetchEvents');
        alert("予定を登録しました")
      }
    })
      calendar.fullCalendar('unselect');
  };

  var initialLocaleCode = 'ja';
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
    plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
    axisFormat: 'H:mm',
    timeFormat: 'H:mm',
    select: select,
    height: 800,
    firstDay: 0,                           // 0:日曜日から表示
    firstHour: 9,
    navLinks: true,
    editable: true,                        // イベントの編集可能
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
    allDaySlot: true,                     // 終日スロットを非表示
    weekNumbers: false,                    // 週数を表示
    selectHelper: true,
    minTime: "00:00:00",                   // スケジュールの開始時間
    maxTime: "24:00:00",                   // スケジュールの最終時間
    allDayText:'allday',                   // 終日スロットのタイトル
    // selectMinDistance: 1,                  // クリックとドラッグの判別
    defaultView: 'month',
    ignoreTimezone: false,
    Timezone: 'Asia/Tokyo',
		// displayEventEnd: true,                // event終了時間表示
    // displayEventTime: true,
    events: '/events.json',
    slotDuration: '00:30:00',              // 表示する時間軸の細かさ
    snapDuration: '00:15:00',              // スケジュールをスナップするときの動かせる細かさ
    locale: initialLocaleCode,
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
    //編集モーダル
    eventClick: function(calEvent, jsEvent, view) {
      // カレンダーに設定したイベントクリック時のイベント
      // $('#body__header__title').html(calEvent.title); // モーダルのタイトルをセット
      // $('#body__header__memo').html(calEvent.memo); // モーダルの本文をセット
      $("#scheduleId").val(event.id);
      $("#inputTitle").val(event.title);
      $('#showEventModal').modal(); // モーダル着火
    },

    // ドラッグ後の日付にデータ更新する
    eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
      moveSchedule(event.id, event.start.format('YYYY-MM-DD'), event.end.format('YYYY-MM-DD'));
    },

    // eventRender: function (event, element) {
    //   var id = event.id
    //   var show_url = "/events/"+id
    //   element.attr('href', 'javascript:void(0);');
    //   element.click(function() {
    //     $("#showEventModal").modal();
    //   });
    // },
  });
});


//modal以外クリックで閉じる
$('#calendar').click(function(event){
  var clickedElement = $(event.target);
  if($(clickedElement).hasClass('.modal-backdrop.in')){
    $('.body').fadeOut(500);
  }
});
