// Write your JavaScript code.
let monthList = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
let dayList = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
let dayListShort = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
let today = new Date();                                     // Date object to store current date
let todaysDate = today.getDate();                           // Store the current Date number (1-31)
let todaysDay = today.getDay();                             // Store the current day number (0-6)
let todaysMonth = today.getMonth();                         // Store the current month number (0-11)
let todaysYear = today.getFullYear();                       // Store the current year
let dayNumber = todaysDate;
let monthNumber = todaysMonth;                              // Track current month
let yearNumber = todaysYear;                                // Track current year
let firstDate = new Date(yearNumber, monthNumber, 1);       // Data object to store the first day of current month
let lastDate = new Date(yearNumber, monthNumber + 1, 0);    // Data object to store the last day of currenmyEventt
let firstDay = firstDate.getDay() + 1;                      // Track the day number 1-7 of the first day of the current month
let numberOfDays = 0;
let calendarString = "";
let numberOfEvents = 0;

/**
 * This function detects user input to show calendar change for particular month.
 * @param {string} buttonPressed pass action to function
 */
function changeDate(buttonPressed) {
    if (buttonPressed === "previousMonth") {
        monthNumber--;
        if (monthNumber < 0) {
            monthNumber = 11;
            yearNumber--;
        }
    }
    else if (buttonPressed === "nextMonth") {
        monthNumber++;
        if (monthNumber > 11) {
            monthNumber = 0;
            yearNumber++;
        }
    }
    else if (buttonPressed === "startRender") {
        monthNumber = todaysMonth;
        yearNumber = todaysYear;
    }
    else {
        // catch bad input, set to today
        changeDate("startRender");
    }

    firstDate = new Date(yearNumber, monthNumber, 1);
    firstDay = firstDate.getDay();

    lastDate = new Date(yearNumber, monthNumber + 1, 0);
    numberOfDays = lastDate.getDate();

    // invokes calendar creation after set the month and year
    createCalendar("default");
}

/**
 * This function is to create a calendar and add event description, if found any.
 * @param {string} type type of calendar view, can be default(month), week or year
 */
function createCalendar(type) {
    calendarString = "";
    if (type === "default") {
        /**
         * Illustration of Calendar - Month View
         * R1:  <Go back to current date> <previousMonth>           <Month Year>              <nextMonth>       <View>
         * R2:  <Sun>           <Mon>           <Tue>           <Wed>           <Thu>           <Fri>           <Sat>
         * R3:                                                  //dynamically fill
         * R4:                                                  //dynamically fill
         * R5:                                                  //dynamically fill
         * R6:                                                  //dynamically fill
         * R7:                                                  //dynamically fill
         * R8:                                                  //dynamically fill          
         */

        calendarString += "<table class=\"table table-layout-fixed\">";
        calendarString += "<thead class=\"table-head\">";

        // Row 1
        calendarString += "<tr>";

        // Row 1 Col 1-2
        calendarString += "<th colspan=\"2\" class=\"table-width-28\">";
        calendarString += "<a href=\"#\" ";
        calendarString += "class=\"changeDatePrev table-button-top\" ";
        let tempM = monthNumber - 1;
        let tempY = yearNumber;
        if (tempM < 0) {
            tempM = 11;
            tempY--;
        }
        calendarString += "title=\"Go to " + monthList[tempM] + " " + tempY + "\" >";
        calendarString += "<i class=\"fas fa-chevron-left fa-lg\"></i>";
        calendarString += "</a>";
        calendarString += "</th>";

        // Row 1 Col 3-5
        calendarString += "<th colspan=\"3\" colspan=\"3\" class=\"table-width-44\">";
        calendarString += "" + monthList[monthNumber] + "&nbsp;" + yearNumber;
        calendarString += "</th>";

        // Row 1 Col 6-7
        calendarString += "<th colspan=\"2\" class=\"table-width-28\">";
        calendarString += "<a href=\"#\" ";
        calendarString += "class=\"changeDateNext table-button-top\" ";
        tempM = monthNumber + 1;
        tempY = yearNumber;
        if (tempM > 11) {
            tempM = 0;
            tempY++;
        }
        calendarString += "title=\"Go to " + monthList[tempM] + " " + tempY + "\" >";
        calendarString += "<i class=\"fas fa-chevron-right fa-lg\"></i>";
        calendarString += "</a>";
        calendarString += "</th>";

        calendarString += "</tr>";
        calendarString += "</thead>";

        //-------------------------------  Row 1 ends  ------------------------------------

        // Row 2
        calendarString += "<tr>";
        calendarString += "<td class=\"table-width-14\">" + "Sun" + "</td>";
        calendarString += "<td class=\"table-width-14\">" + "Mon" + "</td>";
        calendarString += "<td class=\"table-width-14\">" + "Tue" + "</td>";
        calendarString += "<td class=\"table-width-14\">" + "Wed" + "</td>";
        calendarString += "<td class=\"table-width-14\">" + "Thu" + "</td>";
        calendarString += "<td class=\"table-width-14\">" + "Fri" + "</td>";
        calendarString += "<td class=\"table-width-14\">" + "Sat" + "</td>";
        calendarString += "</tr>";

        //-------------------------------  Row 2 ends  ------------------------------------

        //Row 3 - 8

        // determine rows to be draw for calendar
        // 2 Conditions to be 6 rows:
        //      1. The first day of the month is Saturday and number of days in the month >= 30
        //      2. The first day of the month is Friday and number of days in the month = 31
        let numberOfRows = (function () {
            if (firstDay === 5 && numberOfDays === 31 || firstDay === 6 && numberOfDays >= 30) {
                return 6;
            }
            else {
                return 5;
            }
        })();

        let printedDayCounter = 1;

        for (let i = 0; i < numberOfRows * 7; i++) {
            // start new row
            if (i % 7 === 0) {
                calendarString += "<tr>";
            }

            // if it has yet to reach the first day, draw col with nothing
            if (i < firstDay) {
                calendarString += "<td></td>";
            }

            // Draw col when it starts on first day and ends on last day, which is determined by formula: numberOfDays + firstDay - 1
            if (i >= firstDay && i <= numberOfDays + firstDay - 1) {
                // If there is event on a day
                if (checkEvent(printedDayCounter, monthNumber + 1, yearNumber)) {
                    // handle with event
                    if (printedDayCounter === todaysDate && monthNumber === todaysMonth && yearNumber === todaysYear) {
                        calendarString += "<td class=\"event date-center-adjust\">";
                        calendarString += "<a href=\"#\" ";
                        calendarString += "onclick=\"showEvent(" + printedDayCounter + ", " + (monthNumber + 1) + ", " + yearNumber + ")\"";
                        calendarString += " title=\"" + getEventNameForTitle(printedDayCounter, monthNumber + 1, yearNumber) + "\"> ";
                        calendarString += "<span class=\"today\">" + printedDayCounter + "</span>";
                        calendarString += "<br>";
                        calendarString += getFullEventName(printedDayCounter, monthNumber + 1, yearNumber);
                        calendarString += "</a>";
                        calendarString += "</td>";
                        printedDayCounter++;
                    }
                    else {
                        calendarString += "<td class=\"event date-center-adjust\">";
                        calendarString += "<a href=\"#\" ";
                        calendarString += "onclick=\"showEvent(" + printedDayCounter + ", " + (monthNumber + 1) + ", " + yearNumber + ")\"";
                        calendarString += " title=\"" + getEventNameForTitle(printedDayCounter, monthNumber + 1, yearNumber) + "\"> ";
                        calendarString += "" + printedDayCounter;
                        calendarString += "<br>";
                        calendarString += getFullEventName(printedDayCounter, monthNumber + 1, yearNumber);
                        calendarString += "</a>";
                        calendarString += "</td>";
                        printedDayCounter++;
                    }
                }
                else {
                    // handle without event
                    if (printedDayCounter === todaysDate && monthNumber === todaysMonth && yearNumber === todaysYear) {
                        calendarString += "<td><span class=\"today\">" + printedDayCounter + "</span></td>";
                        printedDayCounter++;
                    }
                    else {
                        calendarString += "<td>" + printedDayCounter + "</td>";
                        printedDayCounter++;
                    }
                }
            }

            // draw col with nothing for the rest
            if (i > numberOfDays + firstDay - 1) {
                calendarString += "<td></td>";
            }

            // end a row for every 7 col
            if (i % 7 === 6) {
                calendarString += "</tr>";
            }
        }

        //-------------------------------  Row 3-8 ends  ------------------------------------

        //// Row 9
        calendarString += "<tfoot>";
        calendarString += "<tr>";
        calendarString += "<td colspan=\"7\" class=\"changeDateStart ex\" style=\" text-align: center;\">";
        calendarString += "<a href=\"#\" ";
        calendarString += "style=\"font-weight: bold;\"";
        calendarString += "title=\"Go to " + todaysDate + " " + monthList[todaysMonth] + " " + todaysYear + "\" >";
        calendarString += "Back to Today";
        calendarString += "</a>";
        calendarString += "</td>";
        calendarString += "</tr>";
        calendarString += "</tfoot>";

        calendarString += "</table>";
    }
    else {
        // check for bad input/parameter
        createCalendar("default");
    }

    // Set table on html
    let object = document.getElementById("calendar");
    object.innerHTML = calendarString;
}

/**
 * This function is to determine is there is any event on a day.
 * @param {int} day day
 * @param {int} month month
 * @param {int} year year
 * @return {bool} true if there is event, false otherwise
 */
function checkEvent(day, month, year) {
    numberOfEvents = 0;

    for (let i = 0; i < myEvent2.length; i++) {
        if (parseInt(myEvent2[i].Date.split('/')[0]) === day && parseInt(myEvent2[i].Date.split('/')[1]) === month && parseInt(myEvent2[i].Date.split('/')[2]) === year) {
            numberOfEvents++;
            break;
        }
    }

    if (numberOfEvents > 0) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * This function is to create an event table with link to training form.
 * @param {int} day day
 * @param {int} month month
 * @param {int} year year
 */
function showEvent(day, month, year) {
    let eventString = "";

    // draw header
    eventString += "<table class=\"table table-bordered table-layout-fixed\">";
    eventString += "<thead class=\"table-head\">";
    eventString += "<tr>";
    eventString += "<th class=\"table-width-14\">" + "Course Date" + "</th>";
    eventString += "<th class=\"table-head-no-center\">" + "Course Name" + "</th>";
    eventString += "<th class=\"table-width-14\">" + "Target Group" + "</th>";
    eventString += "<th class=\"table-width-14\">" + "* Available Seats" + "</th>";
    eventString += "</tr>";
    eventString += "</thead>";

    eventString += "<tbody>";
    for (let i = 0; i < myEvent2.length; i++) {
        if (parseInt(myEvent2[i].Date.split('/')[0]) === day && parseInt(myEvent2[i].Date.split('/')[1]) === month && parseInt(myEvent2[i].Date.split('/')[2]) === year) {
            eventString += "<tr>";
            eventString += "<td>" + day + " " + monthList[monthNumber] + " " + year + "</td>";
            // insert course url
            eventString += "<td class=\"table-head-no-center\">";
            eventString += "<a ";
            eventString += "href=\"http://intranet/Training?intTrainingID=" + myEvent2[i].TrainID + "\"";
            eventString += " title=\"" + myEvent2[i].Title + "\"> ";
            eventString += myEvent2[i].Title;
            eventString += "</a>";
            eventString += "</td>";
            eventString += "<td>" + myEvent2[i].Target + "</td>";
            eventString += "<td>" + myEvent2[i].Seat + "</td>";
            eventString += "</tr>";
        }
    }
    eventString += "</tbody>";
    eventString += "</table>";

    // Set table on html
    let object = document.getElementById("event");
    object.innerHTML = eventString;
}

/**
 * This function is to return name of event.
 * @param {int} day day
 * @param {int} month month
 * @param {int} year year
 * @return {string} of event name
 */
function getEventNameForTitle(day, month, year) {
    let eventName = "";

    for (let i = 0; i < myEvent2.length; i++) {
        if (parseInt(myEvent2[i].Date.split('/')[0]) === day && parseInt(myEvent2[i].Date.split('/')[1]) === month && parseInt(myEvent2[i].Date.split('/')[2]) === year) {
            eventName += myEvent2[i].Title + ", ";
        }
    }
    eventName = eventName.substring(0, eventName.length - 2);

    return eventName;
}

/**
 * This function is to return full name of event.
 * @param {int} day day
 * @param {int} month month
 * @param {int} year year
 * @return {string} of full event name
 */
function getFullEventName(day, month, year) {
    let eventName = "";

    for (let i = 0; i < myEvent2.length; i++) {
        if (parseInt(myEvent2[i].Date.split('/')[0]) === day && parseInt(myEvent2[i].Date.split('/')[1]) === month && parseInt(myEvent2[i].Date.split('/')[2]) === year) {
            eventName += "<div class=\"hide-text colorise\">" + myEvent2[i].Title + "</div><br>";
        }
    }
    eventName = eventName.substring(0, eventName.length - 4);

    return eventName;
}

/**
 * This function is to return full name of event.
 * @param {int} day day
 * @param {int} month month
 * @param {int} year year
 * @return {string} of full event name
 */
function getFullEventNameDay(day, month, year) {
    let eventName = "";

    for (let i = 0; i < myEvent2.length; i++) {
        if (parseInt(myEvent2[i].Date.split('/')[0]) === day && parseInt(myEvent2[i].Date.split('/')[1]) === month && parseInt(myEvent2[i].Date.split('/')[2]) === year) {
            eventName += "<div class=\"colorise\">" + myEvent2[i].Title + "</div><br>";
        }
    }
    eventName = eventName.substring(0, eventName.length - 4);

    return eventName;
}

/**
 * This function is to show a list of event that available.
 */
function showFullEventList() {
    let eventString = "";

    // draw header
    eventString += "<table class=\"table table-bordered table-layout-fixed\">";
    eventString += "<thead class=\"table-head\">";
    eventString += "<tr>";
    eventString += "<th class=\"table-width-14\">" + "Course Date" + "</th>";
    eventString += "<th class=\"table-head-no-center\">" + "Course Name" + "</th>";
    eventString += "<th class=\"table-width-14\">" + "Target Group" + "</th>";
    eventString += "<th class=\"table-width-14\">" + "* Available Seats" + "</th>";
    eventString += "</tr>";
    eventString += "</thead>";

    eventString += "<tbody>";
    for (let i = 0; i < myEvent2.length; i++) {
        eventString += "<tr>";
        eventString += "<td>" + myEvent2[i].Date.split('/')[0] + " " + monthList[parseInt(myEvent2[i].Date.split('/')[1]) - 1] + " " + myEvent2[i].Date.split('/')[2] + "</td>";
        // insert course url
        eventString += "<td class=\"table-head-no-center\">";
        eventString += "<a ";
        eventString += "href=\"http://intranet/Training?intTrainingID=" + myEvent2[i].TrainID + "\"";
        eventString += " title=\"" + myEvent2[i].Title + "\"> ";
        eventString += myEvent2[i].Title;
        eventString += "</a>";
        eventString += "</td>";
        eventString += "<td>" + myEvent2[i].Target + "</td>";
        eventString += "<td>" + myEvent2[i].Seat + "</td>";
        eventString += "</tr>";
    }
    eventString += "</tbody>";
    eventString += "</table>";

    // Set table on html
    let object = document.getElementById("event");
    object.innerHTML = eventString;
}

/**
 * This function is to hide the event list.
 */
function hideFullEventList() {
    let eventString = "";

    // draw header
    eventString += "<table class=\"table table-bordered table-layout-fixed\">";
    eventString += "<thead class=\"table-head\">";
    eventString += "<tr>";
    eventString += "<th class=\"table-width-14\">" + "Course Date" + "</th>";
    eventString += "<th class=\"table-head-no-center\">" + "Course Name" + "</th>";
    eventString += "<th class=\"table-width-14\">" + "Target Group" + "</th>";
    eventString += "<th class=\"table-width-14\">" + "* Available Seats" + "</th>";
    eventString += "</tr>";
    eventString += "</thead>";
    eventString += "</table>";

    // Set table on html
    let object = document.getElementById("event");
    object.innerHTML = eventString;
}

$(document).ready(function () {
    // changeDate("startRender");
});

$(document).on("click", ".changeDateStart", function () {
    changeDate("startRender");
});

$(document).on("click", ".changeDatePrev", function () {
    changeDate('previousMonth');
});

$(document).on("click", ".changeDateNext", function () {
    changeDate('nextMonth');
});

$(document).on("click", "#event-func", function () {
    if ($(this).hasClass("showEvent")) {
        showFullEventList();
        $("#event-arrow").attr("class", "fas fa-chevron-up fa-lg");
        $("#event-arrow").attr("title", "Click to hide all event");
        $("#event-func").attr("class", "hideEvent");
    }
    else if ($(this).hasClass("hideEvent")) {
        hideFullEventList();
        $("#event-arrow").attr("class", "fas fa-chevron-down fa-lg");
        $("#event-arrow").attr("title", "Click to show all event");
        $("#event-func").attr("class", "showEvent");
    }
    else {
        console.log($(this).attr("class"));
        alert("Error found.");
    }
});

$(document).on("click", ".event", function () {
    $("#event-arrow").attr("class", "fas fa-chevron-up fa-lg");
    $("#event-arrow").attr("title", "Click to hide event");
    $("#event-func").attr("class", "hideEvent");
});