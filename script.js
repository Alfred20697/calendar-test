/**
 * Author: Alfred Loo
 * Date Edited: 12/04/2018
 * Contact: alfred97620@gmail.com
 * Link: https://github.com/Alfred20697
 * Version: 0.2
 * License: N/A
 * Credits To:  Yusuf Shakeel (https://github.com/yusufshakeel/dyCalendarJS), 
 *              Clark Hey (http://www.javascriptkit.com/script/script2/eventscalendar.shtml#)
 */

let monthList = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
let dayList = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
let dayListShort = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
let today = new Date();                                     //Date object to store current date
let todaysDate = today.getDate();                           //Store the current Date number (1-31)
let todaysDay = today.getDay();                             //Store the current day number (0-6)
let todaysMonth = today.getMonth();                         //Store the current month number (0-11)
let todaysYear = today.getFullYear();                       //Store the current year
let monthNumber = todaysMonth;                              //Track current month
let yearNumber = todaysYear;                                //Track current year
let firstDate = new Date(yearNumber, monthNumber, 1);       //Data object to store the first day of current month
let lastDate = new Date(yearNumber, monthNumber + 1, 0);    //Data object to store the last day of current
let firstDay = firstDate.getDay() + 1;                      //Track the day number 1-7 of the first day of the current month
let numberOfDays = 0;
let calendarString = "";

function changeDate(buttonPressed) {
    if (buttonPressed == "previousYear") {
        yearNumber--;
    } else if (buttonPressed == "nextYear") {
        yearNumber++;
    } else if (buttonPressed == "previousMonth") {
        monthNumber--;
        if (monthNumber < 0) {
            monthNumber = 11;
            yearNumber--;
        }
    }
    else if (buttonPressed == "nextMonth") {
        monthNumber++;
        if (monthNumber > 11) {
            monthNumber = 0;
            yearNumber++;
        }
    }
    else if (buttonPressed == "startRender") {
        monthNumber = todaysMonth;
        yearNumber = todaysYear;
    }
    else {
        //some error message
        monthNumber = todaysMonth;
        yearNumber = todaysYear;
    }

    firstDate = new Date(yearNumber, monthNumber, 1);
    firstDay = firstDate.getDay();

    lastDate = new Date(yearNumber, monthNumber + 1, 0);
    numberOfDays = lastDate.getDate();

    createCalendar();
}

function createCalendar() {
    /**
     * Illustration of Calendar
     * R1:  <previousMonth>         <Month Year>        <nextMonth>
     * R2:  <Sun>   <Mon>   <Tue>   <Wed>   <Thu>   <Fri>   <Sat>
     * R3:  //dynamically fill
     * R4:  //dynamically fill
     * R5:  //dynamically fill
     * R6:  //dynamically fill
     * R7:  //dynamically fill
     * R8:  //dynamically fill
     * R9:                   <Go back to current date>
     */


    calendarString = "";

    // Row 1
    calendarString += "<table class=\"table table-bordered\">";
    calendarString += "<tr>";
    calendarString += "<td colspan=\"2\"><a href=\"#\" class=\"btn btn\" role=\"button\" onclick=\"changeDate('previousMonth')\"><i class=\"fas fa-chevron-left\"></i></a></td>";
    calendarString += "<td colspan=\"3\"><b>" + monthList[monthNumber] + "&nbsp;" + yearNumber + "</b></td>";
    calendarString += "<td colspan=\"2\"><a href=\"#\" class=\"btn btn\" role=\"button\" onclick=\"changeDate('nextMonth')\"><i class=\"fas fa-chevron-right\"></i></a></td>";
    calendarString += "</tr>";

    // Row 2
    calendarString += "<tr>";
    calendarString += "<td>" + "Sun" + "</td>";
    calendarString += "<td>" + "Mon" + "</td>";
    calendarString += "<td>" + "Tue" + "</td>";
    calendarString += "<td>" + "Wed" + "</td>";
    calendarString += "<td>" + "Thu" + "</td>";
    calendarString += "<td>" + "Fri" + "</td>";
    calendarString += "<td>" + "Sat" + "</td>";
    calendarString += "</tr>";

    //Row 3 - 8
    let numberOfRows = (function () {
        if (((firstDay == 5) && (numberOfDays == 31)) || ((firstDay == 6) && (numberOfDays >= 30))) {
            return 6;
        }
        else {
            return 5;
        }
    })();

    let printedDayCounter = 1;

    for (let i = 0; i < numberOfRows * 7; i++) {
        if (i % 7 == 0) {
            calendarString += "<tr>";
        }
        if (i < firstDay) {
            calendarString += "<td></td>";
        }
        if ((i >= firstDay) && (i <= (numberOfDays + firstDay - 1))) {
            if (checkEvent(printedDayCounter, monthNumber + 1, yearNumber)) {
                if ((printedDayCounter == (todaysDate)) && (monthNumber == todaysMonth) && (yearNumber == todaysYear)) {
                    calendarString += "<td class=\"today\"><a href=\"#\" onclick=\"showEvent(" + printedDayCounter + ", " + (monthNumber + 1) + ", " + yearNumber + ")\">" + printedDayCounter + "</a></td>";
                    printedDayCounter++;
                }
                else {
                    calendarString += "<td><a href=\"#\" onclick=\"showEvent(" + printedDayCounter + ", " + (monthNumber + 1) + ", " + yearNumber + ")\">" + printedDayCounter + "</a></td>";
                    printedDayCounter++;
                }
            }
            else {
                if ((printedDayCounter == (todaysDate)) && (monthNumber == todaysMonth) && (yearNumber == todaysYear)) {
                    calendarString += "<td class=\"today\">" + printedDayCounter + "</td>";
                    printedDayCounter++;
                }
                else {
                    calendarString += "<td>" + printedDayCounter + "</td>";
                    printedDayCounter++;
                }
            }
        }
        if (i > (numberOfDays + firstDay - 1)) {
            calendarString += "<td></td>";
        }
        if (i % 7 == 6) {
            calendarString += "</tr>";
        }
    }

    // Row 9
    calendarString += "<tr>";
    calendarString += "<td colspan=\"7\"><a href=\"#\" class=\"btn btn\" role=\"button\" onclick=\"changeDate('startRender')\">Back to Today</a></td>";
    calendarString += "</tr>";


    let object = document.getElementById("calendar");
    object.innerHTML = calendarString;
}

function checkEvent(day, month, year) {
    let numberOfEvents = 0;

    for (let i = 0; i < myEvent.length; i++) {
        if ((myEvent[i][0] == day) && (myEvent[i][1] == month) && (myEvent[i][2] == year)) {
            numberOfEvents++;
        }
    }

    if (numberOfEvents > 0) {
        return true;
    }
    else {
        return false;
    }
}

function showEvent(day, month, year) {
    let eventString = "";
    eventString += "<table class=\"table table-bordered\">";
    eventString += "<thead>";
    eventString += "<tr>";
    eventString += "<th>" + "Course Date" + "</th>";
    eventString += "<th>" + "Course Name" + "</th>";
    eventString += "<th>" + "Target Group" + "</th>";
    eventString += "<th>" + "* Available Seats" + "</th>";
    eventString += "</tr>";
    eventString += "</thead>";

    eventString += "<tbody>";
    for (let i = 0; i < myEvent.length; i++) {
        if ((myEvent[i][0] == day) && (myEvent[i][1] == month) && (myEvent[i][2] == year)) {
            eventString += "<tr>";
            eventString += "<td>" + day + " " + monthList[monthNumber] + " " + year + "</td>";
            eventString += "<td>" + myEvent[i][5] + "</td>";
            eventString += "<td>" + myEvent[i][6] + "</td>";
            eventString += "<td>" + myEvent[i][7] + "</td>";
            eventString += "</tr>";
        }
    }
    eventString += "</tbody>";
    eventString += "</table>";

    let object = document.getElementById("event");
    object.innerHTML = eventString;
}


// Task to be done:
// 1. Implement better algorithm for creating timetable and event table with reference to dycalendar.js
// 2. Think of more exception case, e.g. event that occur on multiple days
// 3. Implement list view, day view and year view
// 4. Implement batch dot of event (if there is an event, there will be dot on right upper corner with the number of events)