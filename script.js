/**
 * Author: Alfred Loo
 * Date Edited: 13/04/2018
 * Contact: alfred97620@gmail.com
 * Link: https://github.com/Alfred20697
 * Version: 0.3
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
    calendarString += "<table class=\"table table-fix-layout\">";
    calendarString += "<thead class=\"table-head\">";
    calendarString += "<tr>";

    calendarString += "<th class=\"\">";
    calendarString += "<a href=\"#\" ";
    calendarString += "class=\"table-button-top\"";
    calendarString += "onclick=\"changeDate('previousMonth')\">";
    calendarString += "<i class=\"fas fa-chevron-left fa-lg\"></i>";
    calendarString == "</a>";
    calendarString += "</th>";

    calendarString += "<th class=\"\">";
    // calendarString += "<a href=\"#\" ";
    // calendarString += "class=\"table-button-top\"";
    // calendarString += "onclick=\"changeDate('previousYear')\">";
    calendarString += "<span class=\"hide-text\">Prev Month</span>";
    calendarString == "</a>";
    calendarString += "</th>";

    calendarString += "<th class=\"\" colspan=\"3\">";
    calendarString += "" + monthList[monthNumber] + "&nbsp;" + yearNumber;
    calendarString += "</th>";

    calendarString += "<th class=\"\">";
    // calendarString += "<a href=\"#\" ";
    // calendarString += "class=\"table-button-top\"";
    // calendarString += "onclick=\"changeDate('nextYear')\">";
    calendarString += "<span class=\"hide-text\">Next Month</span>";
    calendarString == "</a>";
    calendarString += "</th>";

    calendarString += "<th class=\"\">";
    calendarString += "<a href=\"#\" ";
    calendarString += "class=\"table-button-top\"";
    calendarString += "onclick=\"changeDate('nextMonth')\">";
    calendarString += "<i class=\"fas fa-chevron-right fa-lg\"></i>";
    calendarString == "</a>";
    calendarString += "</th>";

    calendarString += "</tr>";
    calendarString += "</thead>";

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
                    calendarString += "<td class=\"event-today date-center-adjust\">";
                    calendarString += "<a href=\"#\" ";
                    calendarString += "onclick=\"showEvent(" + printedDayCounter + ", " + (monthNumber + 1) + ", " + yearNumber + ")\">";
                    calendarString += "" + printedDayCounter;
                    calendarString += "<span class=\"event-name hide-text\">";
                    calendarString += ": " + getEventName(printedDayCounter, monthNumber + 1, yearNumber);
                    calendarString += "</span>";
                    calendarString += "</a>";
                    calendarString += "</td>";
                    printedDayCounter++;
                }
                else {
                    let d = new Date(yearNumber, monthNumber, printedDayCounter);
                    if (d < today) {
                        calendarString += "<td>" + printedDayCounter + "</td>";
                        printedDayCounter++;
                    }
                    else {
                        calendarString += "<td class=\"event date-center-adjust\">";
                        calendarString += "<a href=\"#\" ";
                        calendarString += "onclick=\"showEvent(" + printedDayCounter + ", " + (monthNumber + 1) + ", " + yearNumber + ")\">";
                        calendarString += "" + printedDayCounter;
                        calendarString += "<span class=\"event-name hide-text\">";
                        calendarString += ": " + getEventName(printedDayCounter, monthNumber + 1, yearNumber);
                        calendarString += "</span>";
                        calendarString += "</a>";
                        calendarString += "</td>";
                        printedDayCounter++;
                    }
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
    calendarString += "<tfoot>";
    calendarString += "<tr>";
    calendarString += "<td colspan=\"7\">";
    calendarString += "<a href=\"#\" ";
    calendarString += "style=\"font-weight: bold;\"";
    calendarString += "class=\"\"";
    calendarString += "onclick=\"changeDate('startRender')\">";
    calendarString += "Back to Today";
    calendarString == "</a>";
    calendarString += "</td>";
    calendarString += "</tr>";
    calendarString += "</tfoot>";


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
    eventString += "<table class=\"table table-bordered table-fix-layout\">";
    eventString += "<thead class=\"table-head\">";
    eventString += "<tr>";
    eventString += "<th class=\"adj table-width-15\">" + "Course Date" + "</th>";
    eventString += "<th class=\"adj table-width-45 no-center\">" + "Course Name" + "</th>";
    eventString += "<th class=\"adj table-width-15\">" + "Target Group" + "</th>";
    eventString += "<th class=\"adj table-width-15\">" + "Seats Available" + "</th>";
    eventString += "</tr>";
    eventString += "</thead>";

    eventString += "<tbody>";
    for (let i = 0; i < myEvent.length; i++) {
        if ((myEvent[i][0] == day) && (myEvent[i][1] == month) && (myEvent[i][2] == year)) {
            eventString += "<tr>";
            eventString += "<td>" + day + " " + monthList[monthNumber] + " " + year + "</td>";
            // insert course url
            eventString += "<td class=\"no-center\">"
            eventString += "<a href=";
            eventString += "\"" + myEvent[i][8] + "\">";
            eventString += myEvent[i][5];
            eventString += "</a>";
            eventString += "</td>";
            //
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

function getEventName(day, month, year) {
    let eventName = "";

    for (let i = 0; i < myEvent.length; i++) {
        if ((myEvent[i][0] == day) && (myEvent[i][1] == month) && (myEvent[i][2] == year)) {
            eventName = myEvent[i][5];
            break;
        }
    }

    return eventName.length > 30 ? eventName.substring(0, 30) + " ..." : eventName;
}

