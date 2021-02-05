var today = new Date(),
    day = today.getDate(),
    month = today.getMonth() + 1,
    year = today.getFullYear();

/* Fills the today's date into te input fields */
function fillCurrentDate(theDay, theMonth, theYear, theRoman) {
    if (day < 10) {document.getElementById(theDay).placeholder = '0' + day; } else {document.getElementById(theDay).placeholder = day; }
    if (month < 10) {document.getElementById(theMonth).placeholder = '0' + month; } else {document.getElementById(theMonth).placeholder = month; }
    document.getElementById(theYear).placeholder = year;

    document.getElementById(theRoman).value = convertRoman(
      document.getElementById('gregDay').placeholder,
      document.getElementById('gregMonth').placeholder,
      document.getElementById('gregYear').placeholder
    );
}

/* Converts a decimal integer into the roman string format */
function intToRoman(theInt) {
    var romans = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'],
        arabics = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000],
        out = '',
        i;

    if (theInt < 0) { theInt = -1 * theInt; } //convert negative values to positive
    if (theInt == 0) {out = '0';}
    else {
        for (i = romans.length - 1; i >= 0; i--) {
            while (theInt >= arabics[i]) {
                theInt = theInt - arabics[i];
                out = out + romans[i];
            }
        }
    }

    return out;
}

/* Check, if the chosen year is a leap year */
function checkLeapYear(theYear) {
    if ( (theYear % 4 == 0) && ((theYear % 100 != 0) || (theYear % 100 == 0 && theYear % 400 == 0) ) ) {
        return true;
    }
    return false;
}

/* Get the name of the month */
function monthName(id, kasus) {
    while (id > 12) {id = id - 12;}
    var nominative = ['Ianuarius', 'Februarius', 'Martius', 'Aprilis', 'Maius', 'Iunius', 'Iulius/Quintilis', 'Augustus/Sextilis', 'September', 'October', 'November', 'December'],
        accusative = ['Ianuarias', 'Februarias', 'Martias', 'Aprilis', 'Maiss', 'Iunias', 'Iulias/Quintilis', 'Augustas/Sextilis', 'Septembris', 'Octobris', 'Novembris', 'Decembris'],
        ablative = ['Ianuariis', 'Februariis', 'Martiis', 'Aprilibus', 'Maiis', 'Iuniis', 'Iuliis/Quintilibus', 'Augustas/Sextilibus', 'Septembribus', 'Octobribus', 'Novembribus', 'Decembribus'],
        out;

    switch (kasus) {
        case 'nominative':
            out = nominative[id - 1];
            break;
        case 'accusative':
            out = accusative[id - 1];
            break;
        case 'ablative':
            out = ablative[id - 1];
            break;
    }

    return out;
}

/* Main function, converts it into the roman spelling */
function convertRoman(day, month, year) {convertRoman: {

    var gregDate = [day, month, year],
        lengthOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        shiftedDays = [false, false, true, false, true, false, true, false, false, true, false, false], //March, May, July, October have different nonae and ides
        kalendae = 1,
        nonae = 5,
        idus = 13,

        out;

    if ( gregDate[0] == '' ) {gregDate[0] = day;}
    if ( gregDate[1] == '' ) {gregDate[1] = month;}
    if ( gregDate[2] == '' ) {gregDate[2] = year;}

    if ( shiftedDays[gregDate[1] - 1] == true ) {nonae = 7; idus = 15;}
    if ( checkLeapYear(gregDate[2]) ) { lengthOfMonth[1] = 29;} //February on Leap Year

    if ( (gregDate[1] < 1) || (gregDate[1] > 12) ) {
        alert('Please choose a month between 1 and 12.');
        break convertRoman;
    }
    if ( (gregDate[0] < 1) || (gregDate[0] > lengthOfMonth[gregDate[1] - 1]) ) {
        alert('Please choose a day fitting to the month you chose.');
        break convertRoman;
    }

    if ( gregDate[0] < idus ) { //Check, if it's not after Ides

        if ( gregDate[0] < nonae ) { //Check if it's not after nonae

            if ( gregDate[0] == kalendae ) { //Check, if it's the Kalends
                out = 'Kalendis ' + monthName(gregDate[1], 'ablative') + ' ' + intToRoman(gregDate[2]);
            } else { //Check if it's before the Nones/ after the Kalends
                out = 'Ante diem ' + intToRoman(nonae - gregDate[0] + 1) + ' Nonas ' + monthName(gregDate[1], 'accusative') + ' ' + intToRoman(gregDate[2]);
            }

        } else if ( gregDate[0] == nonae ) { //Check if it's the Nones
            out = 'Nonis ' + monthName(gregDate[1], 'ablative') + ' ' + intToRoman(gregDate[2]);
        } else { //Check, if it's before the Ides /after the Nones
            out = 'Ante diem ' + intToRoman(idus - gregDate[0] + 1) + ' Idus ' + monthName(gregDate[1], 'accusative') + ' ' + intToRoman(gregDate[2]);
        }

    } else if ( gregDate[0] == idus ) { //Check, if it's the Ides
        out = 'Idibus ' + monthName(gregDate[1], 'ablative') + ' ' + intToRoman(gregDate[2]);
    } else { //Check, if it's before the Kalends of the month AFTER
        out = 'Ante diem ' + intToRoman( (lengthOfMonth[gregDate[1] - 1]) - gregDate[0] + 2 ) + ' Kalendas ' + monthName(parseInt(gregDate[1], 10) + 1, 'accusative') + ' ' + intToRoman(gregDate[1] == 12 ? parseInt(gregDate[2], 10)+1 : gregDate[2]);

        //Ante diem VI kal. mart. war doppelt im Februar, wenn Schaltjahr (24+25 Feb), siehe http://www.nabkal.de/romtag.html#absatz3
        //Kasus http://www.mbradtke.de/re001.htm

    }

    out = out.replace("Ante diem II ", "Pridie "); // simplest way to change it, important: space! (to prevent Ante diem III -> Pridiei)
    return out;

}}
