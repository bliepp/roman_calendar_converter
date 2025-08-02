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

}
