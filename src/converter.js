const romansLiterals = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
const arabicLiterals = [1,   4,    5,    9,   10,   40,   50,   90,  100, 400,  500, 900, 1000];

export const CASE = {
	NOMINATIVE: "nominative",
	ACCUSATIVE: "accusative",
	ABLATIVE: "ablative",
};

const MONTH_NAME = {
	[CASE.NOMINATIVE]: ['Ianuarius', 'Februarius', 'Martius', 'Aprilis', 'Maius', 'Iunius', 'Iulius/Quintilis', 'Augustus/Sextilis', 'September', 'October', 'November', 'December'],
	[CASE.ACCUSATIVE]: ['Ianuarias', 'Februarias', 'Martias', 'Aprilis', 'Maiss', 'Iunias', 'Iulias/Quintilis', 'Augustas/Sextilis', 'Septembris', 'Octobris', 'Novembris', 'Decembris'],
	[CASE.ABLATIVE]: ['Ianuariis', 'Februariis', 'Martiis', 'Aprilibus', 'Maiis', 'Iuniis', 'Iuliis/Quintilibus', 'Augustas/Sextilibus', 'Septembribus', 'Octobribus', 'Novembribus', 'Decembribus'],
}

export function IntToRoman(n) {
	if (!Number.isInteger(n)) {
		throw "\"n\" need to be an integer"
	}

	if (n < 0) {
		throw "\"n\" needs to be non-negative integer"
	}

	if (n === 0) {
		return "0"
	}

	let out = "";
	for (let i = romansLiterals.length-1; i >= 0; i--) {
		let arabic = arabicLiterals[i];
		let roman = romansLiterals[i];
		while (n >= arabic) {
			n = n - arabic;
			out = out + roman;
		}
	}

	return out;
}

export function IsLeapYear(year) {
	if (year instanceof Date) {
		year = year.getYear();
	}

	return (
		year % 4 === 0 // year must be divisible by 4
		&& (
			(year % 100 !== 0) // but not by 100
			|| (year % 100 === 0 && year % 400 === 0) // excpet for when it's also divisible by 400
		)
	);
}

export function GetLatinMonthName(month, case_) {
	if (!case_ in MONTH_NAME) {
		throw "Invalid grammatical case"
	}

	let index = (((month-1) % 12) + 12) % 12; // real module, not remainder
	return MONTH_NAME[case_][index]
}

export function DateToRoman(date) {
	let lengthOfMonth = [31, IsLeapYear(date) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	let kalendae = 1, nonae = 5, idus = 13;

	let day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();

	if (month === 3 || month === 5 || month === 7 || month == 10) {
		// shift nonae and idus in March, May, July and October
		nonae = 7;
		idus = 15;
	}

	// TODO: check if date is valid?

	// check for special days
	if (day === kalendae)
		return `Kalendis ${GetLatinMonthName(month, CASE.ABLATIVE)} ${IntToRoman(year)}`
	if (day === nonae)
		return `Nonis ${GetLatinMonthName(month, CASE.ABLATIVE)} ${IntToRoman(year)}`
	if (day === idus)
		return `Idibus ${GetLatinMonthName(month, CASE.ABLATIVE)} ${IntToRoman(year)}`

	if (day > idus) { // after idus, before kalendae
		// return ante diem kalendas of next month => (month+1)!
		// also year+1 if current month is 12 (december)
	} else if (day > nonae) { // after nonae, but before idus
		// return ante diem idus
	} else { // after kalendae, but before nonae => if (day > kalendae)
		// return ante diem nonas
	}

	// TODO: rename ante diem II to pridie
	// TODO: correctly name days of leap year
}
