// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
var planerWorkday = [
  {
    time: "12 AM",
    event: ""
  },
  {
    time: "1 AM",
    event: ""
  },
  {
    time: "2 AM",
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

    // const action = localStorage.getItem(value, time) || "";
    var pastPresent;
    var time = planerWorkday.time;
    var plannerNow = moment(timeNow, 'H A');
    var plannerAction = moment(time, 'H A');
    

    if (plannerNow.isBefore(plannerAction) === true) {
      pastPresent = "future";
    } else if (plannerNow.isAfter(plannerAction) === true) {
      pastPresent = "past";
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

$(document).ready(function () {
  // listen for save button clicks
  $('.saveBtn').on('click', function () {
    // get nearby values
    var value = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id');

    console.log(value, time)

    // save in localStorage
    localStorage.setItem(time, value);
  });
})

showWorkday();