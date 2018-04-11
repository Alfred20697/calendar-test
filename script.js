var thisDate = 1; //Track current date being written in calendar
var monthList = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
var dayList = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var today = new Date(); //Date object to store current date
var todaysDate = today.getDate(); //Store the current Date number (1-31)
var todaysDay = today.getDay(); //Store the current day number (1-7)
var todaysMonth = today.getMonth(); //Store the current month number (1-12)
var todaysYear = today.getFullYear(); //Store the current year
var monthNumber = todaysMonth; //Track current month
var yearNumber = todaysYear; //Track current year
//var firstDate = new Date(String(monthNum)+"/1/"+String(yearNum)); //Data object to store the first day pf current month
//var lastDate = new Date(String(monthNum+1)+"/0/"+String(yearNum)); //Data object to store the last day of current 
var firstDate = new Date(yearNumber, monthNumber, 1);
var lastDate = new Date(yearNumber, monthNumber + 1, 0);
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
    //test();
}

function createCalendar() {
    calendarString = "";
    var dayCounter = 0;
    // Row 1 as in illustration
    calendarString += "<table border=1>";
    calendarString += "<tr>";
    calendarString += "<td align='center' valign='center' width='100' height='50' colspan='2'><a href='#' onclick=\"changeDate('previousMonth')\">Previous Month</a></td>";
    calendarString += "<td align='center' valign='center' width='150' height='50' colspan='3'><b>" + monthList[monthNumber] + '&nbsp;' + yearNumber + "</b></td>";
    calendarString += "<td align='center' valign='center' width='100' height='50' colspan='2'><a href='#' onclick=\"changeDate('nextMonth')\">Next Month</a></td>";
    calendarString += "</tr>";

    // Row 2 as in illustration"
    calendarString += "<tr>";
    calendarString += "<td align='center' valign='center' width='50' height='50'> Sun </td>";
    calendarString += "<td align='center' valign='center' width='50' height='50'> Mon </td>";
    calendarString += "<td align='center' valign='center' width='50' height='50'> Tue </td>";
    calendarString += "<td align='center' valign='center' width='50' height='50'> Wed </td>";
    calendarString += "<td align='center' valign='center' width='50' height='50'> Thu </td>";
    calendarString += "<td align='center' valign='center' width='50' height='50'> Fri </td>";
    calendarString += "<td align='center' valign='center' width='50' height='50'> Sat </td>";
    calendarString += "</tr>";

    thisDate == 1;

    // Row 3-8
    // for (var i=1;i<=6;i++){
    //     calendarString+="<tr>";
    //     for (var j=1;j<=7;j++){
    //         dayCounter=(thisDate-firstDay) +1;
    //         thisDate++; 
    //         if ((dayCounter>numberOfDays)||(dayCounter<1)){
    //             calendarString+="<td align='center' height='50' width='50'>&nbsp;</td>";
    //         }else{
    //             if((todaysDay==j)&&(todaysDate==dayCounter)&&(todaysMonth==monthNumber)){
    //                 if ((todaysDay==x)&&(todaysDate==dayCounter)&&(todaysMonth==monthNumber)){
    //                     calendarString += "<td align='center' height='50' width='50'><a href='#'>'" + daycounter + "'</a></td>";
    //                 }
    //                 calendarString += "<td align='center' height='50' width='50'><a href='#'>'" + daycounter + "'</a></td>";
    //             }else{
    //                 calendarString += "<td align='center' height='50' width='50'><a href='#'>'" + daycounter + "'</a></td>";
    //             }
    //         }
    //     }
    //     calendarString+="</tr>";
    // }

    counter = numberOfDays;
    reverseCounter = 0;
    var flag = false;
    // first row
    calendarString+="<tr>";
    for (var i=0;i<7;i++){
        if ((firstDay>=i)||flag){
            calendarString += "<td align='center' height='50' width='50'>" + (i+1) + "</a></td>";
            flag = true;
        }
        else{
            calendarString += "<td align='center' height='50' width='50'>" + "&nbsp" + "</a></td>";
        }
    }
    calendarString+="</tr>";

    // Row 9
    calendarString += "<tr>";
    calendarString += "<td align='center' valign='center' width='350' height='50' colspan='7' nowrap><a href='#' onclick=\"changeDate('startRender')\"><b>Today</b></a></td";
    calendarString += "</tr>";

    calendarString += "</table>";
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

    var object = document.getElementById('calendar');
    object.innerHTML = calendarString;

    var str = "Day counter: " + dayCounter + " This date: " + thisDate + " First day: " + firstDay + " Counter: " + counter;
    var object2 = document.getElementById('testMessage');
    object2.innerHTML = str;
}