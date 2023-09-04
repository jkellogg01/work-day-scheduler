// Wrap all code that interacts with the DOM in a call to jQuery to ensure thatthe code isn't run until the browser has finished rendering all the elements in the html.

$(function () {
  const dateDisplayEl = $("#current-day");

  //generate the html for the blocks
  const hour = Number(dayjs().format("H"));
  for (let i = 9; i < 17; i++) {
    let timeBlockEl = $('<div class="row time-block">');
    let hourDisplayEl = $('<div class="col-2 col-md-1 hour text-center py-3">');
    let descriptionEl = $(
      '<textarea class="col-8 col-md-10 description" rows="3">'
    );
    let saveBtn = $(
      '<button class="btn saveBtn col-2 col-md-1" aria-label="save">'
    );
    saveBtn.append($('<i class="fas fa-save" aria-hidden="true"></i>'));

    timeBlockEl.attr("id", "hour-" + i);
    hourDisplayEl.text(i + ":00");
    // timeBlockEl.addClass("row time-block");
    // TODO: Add code to apply the past, present, or future class to each time block by comparing the id to the current hour.
    // HINTS:
    // How can the id attribute of each time-block be used to conditionally add or remove the past, present, and future classes?
    // How can Day.js be used to get the current hour in 24-hour time?
    if (i > hour) {
      timeBlockEl.addClass("future");
    } else if (i < hour) {
      timeBlockEl.addClass("past");
    } else {
      timeBlockEl.addClass("present");
    }
    // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
    // HINT:
    // How can the id attribute of each time-block be used to do this?
    descriptionEl.text(localStorage.getItem(timeBlockEl.attr("id")));

    timeBlockEl.append(hourDisplayEl);
    timeBlockEl.append(descriptionEl);
    timeBlockEl.append(saveBtn);
    $("#schedule-body").append(timeBlockEl);
  }
  // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage.
  // HINTS:
  // What does `this` reference in the click listener function?
  // How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked?
  // How might the id be useful when saving the description in local storage?
  $(".saveBtn").on("click", (event) => {
    let timeBlockEl = $(event.target).parent();
    let descriptionEl = timeBlockEl.children(".description");
    let saveContent = descriptionEl.val().trim();
    localStorage.setItem(timeBlockEl.attr("id"), saveContent);
    console.log(saveContent);
  });

  // TODO: Add code to display the current date in the header of the page.
  // seems excessive to set up an interval for this.
  dateDisplayEl.text(dayjs().format("DD MMM YYYY").toUpperCase());
});
