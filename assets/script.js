var planerWorkday = [
  {
    time: "9 AM",
    event: ""
  },
  {
    time: "10 AM",
    event: ""
  },
  {
    time: "11 AM",
    event: ""
  },
  {
    time: "12 PM",
    event: ""
  },
  {
    time: "1 PM",
    event: ""
  },
  {
    time: "2 PM",
    event: ""
  },
  {
    time: "3 PM",
    event: ""
  },
  {
    time: "4 PM",
    event: ""
  },
  {
    time: "5 PM",
    event: ""
  },
];

var today = moment().format('dddd, MMMM Do');
var timeNow = moment().format('H A');

$('#currentDay').text(today);

function showWorkday() {

  for (const hour of planerWorkday) {

    var pastPresent;
    var time = hour.time;
    var plannerNow = moment(timeNow, 'H A');
    var plannerAction = moment(time, 'H A');
    

    if (plannerAction.isBefore(plannerNow) === true) {
      pastPresent = "past";
    } else if (plannerAction.isAfter(plannerNow) === true) {
      pastPresent = "future";
    } else {
      pastPresent = "present";
    }



    const html = `
  <div id="${hour.time}" class="row time-block">
  <div class="col-2 col-md-1 hour text-center py-3">${hour.time}</div>
  <textarea class="col-8 col-md-10 description ${pastPresent}" rows="3"></textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div>
  `
    $("#planner").append(html);
  }

}
showWorkday();

$(document).ready(function () {
  // Load saved data from local storage and set it in the corresponding textareas
  $('.time-block').each(function () {
    var time = $(this).attr('id');
    var value = localStorage.getItem(time);
    $(this).find('.description').val(value);
  });

  // Listen for save button clicks
  $('.saveBtn').on('click', function () {
    // Get nearby values
    var value = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id');

    // Save in localStorage
    localStorage.setItem(time, value);
    // console.log(value, time)
  });
});