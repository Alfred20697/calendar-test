//var thisDate = 1;                                         //Track current date being written in calendar
var monthList = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
var dayList = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var dayListShort = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
var today = new Date();                                     //Date object to store current date
var todaysDate = today.getDate();                           //Store the current Date number (1-31)
var todaysDay = today.getDay();                             //Store the current day number (0-6)
var todaysMonth = today.getMonth();                         //Store the current month number (0-11)
var todaysYear = today.getFullYear();                       //Store the current year
var monthNumber = todaysMonth;                              //Track current month
var yearNumber = todaysYear;                                //Track current year
//var firstDate = new Date(String(monthNum)+"/1/"+String(yearNum)); 
//var lastDate = new Date(String(monthNum+1)+"/0/"+String(yearNum)); 
var firstDate = new Date(yearNumber, monthNumber, 1);       //Data object to store the first day pf current month
var lastDate = new Date(yearNumber, monthNumber + 1, 0);    //Data object to store the last day of current 
var firstDay = firstDate.getDay() + 1; // Track the day number 1-7 of the first day of the current month
var numberOfDays = 0;
var calendarString = "";

function test() {
    //var str = "First day of month: " + dayList[firstDay] + "<br>" + firstDate + "<br>Number of day in the month:" + numberOfDays + "<br>" + lastDate;
    var str = "Day counter: " + dayCounter + "This date" + thisDate + "First day" + firstDay;
    var object = document.getElementById('test');
    object.innerHTML = str;
}

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
    var dayCounter = 0;
    // Row 1 as in illustration
    calendarString += "<table border=1>";
    calendarString += "<tr>";
    calendarString += "<td align='center' valign='center' width='100' height='50' colspan='2'><a href='#' onclick=\"changeDate('previousMonth')\">Previous Month</a></td>";
    calendarString += "<td align='center' valign='center' width='150' height='50' colspan='3'><b>" + monthList[monthNumber] + '&nbsp;' + yearNumber + "</b></td>";
    calendarString += "<td align='center' valign='center' width='100' height='50' colspan='2'><a href='#' onclick=\"changeDate('nextMonth')\">Next Month</a></td>";
    calendarString += "</tr>";

    // Row 2 as in illustration
    calendarString += "<tr>";
    for (var h = 0; h < 7; h++) {
        calendarString += "<td align='center' valign='center' width='50' height='50'>" + dayListShort[h] + "</td>";
    }
    calendarString += "</tr>";

    // Row 3-8
    var counter = numberOfDays;                              // Save total number of days
    var reverseCounter = 1;                                  // Count days from 1 to total, for printing purpose
    var firstDayFlag = false;                                // Decide how many columns to draw before the first day
    var detectFill = 0;                                      // Detect how many columns are filled before printing first day
    var rowCount = 1;                                        // Count the number of rows filled

        // Row 3
        calendarString += "<tr>";
        for (var i = 0; i < 7; i++) {
            // Start printing day when i is equal to the first day (0-6)
            if ((firstDay == i) || firstDayFlag) {
                calendarString += "<td align='center' height='50' width='50'>" + reverseCounter + "</a></td>";
                firstDayFlag = true;
                reverseCounter += 1; 
                counter--;
                detectFill++;
            }
            else {
                calendarString += "<td align='center' height='50' width='50'>" + "&nbsp" + "</a></td>";
                detectFill++;
            }
        }
        calendarString += "</tr>";

        // Row 4-8 or Row 4-7
        while (counter > 0) {
            rowCount++;
            calendarString += "<tr>";
            for (var j = 0; j < 7; j++) {
                calendarString += "<td align='center' height='50' width='50'>" + reverseCounter + "</a></td>";
                reverseCounter += 1;
                counter--;
                detectFill++;
                if (counter == 0) {
                    break;
                }
            }
            if (counter == 0) {
                var columnToFill = (rowCount * 7) - detectFill ;
                for (var k = 0; k < columnToFill; k++) {
                    calendarString += "<td align='center' height='50' width='50'>" + "&nbsp" + "</a></td>";
                }
                break;
            }
            calendarString += "</tr>";

        }

    // Row 9
    calendarString += "<tr>";
    calendarString += "<td align='center' valign='center' width='350' height='50' colspan='7' nowrap><a href='#' onclick=\"changeDate('startRender')\"><b>Today</b></a></td";
    calendarString += "</tr>";

    calendarString += "</table>";

    // decorate today


    var object = document.getElementById('calendar');
    object.innerHTML = calendarString;

    var str = "Day counter: " + dayCounter + " First day: " + firstDay + " Counter: " + columnToFill;
    var object2 = document.getElementById('testMessage');
    object2.innerHTML = str;
}