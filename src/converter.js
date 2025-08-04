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

	let day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();

	// shift nonae and idus in March, May, July and October
	let isShiftedMonth = (month === 3 || month === 5 || month === 7 || month == 10);
	let kalendae = 1,
		nonae = isShiftedMonth ? 7 : 5,
		idus = isShiftedMonth ? 15 : 13;

	// check for special days
	if (day === kalendae)
		return `Kalendis ${GetLatinMonthName(month, CASE.ABLATIVE)} ${IntToRoman(year)}`
	if (day === nonae)
		return `Nonis ${GetLatinMonthName(month, CASE.ABLATIVE)} ${IntToRoman(year)}`
	if (day === idus)
		return `Idibus ${GetLatinMonthName(month, CASE.ABLATIVE)} ${IntToRoman(year)}`

	// TODO: correctly name days of leap year

	// ante diem II was called pridie (the day of the holiday was also counted)
	const rewritePridie = s => s.replace("Ante diem II ", "Pridie ")

	// after idus, before kalendae
	if (day > idus) { // (remember: month -> month+1, in December also year -> year+1)
		return rewritePridie(
			`Ante diem ${IntToRoman(lengthOfMonth[month-1] - day + 2)} ` +
			`Kalendas ${GetLatinMonthName(month + 1, CASE.ACCUSATIVE)} ` +
			`${IntToRoman(month == 12 ? year+1 : year)}`
		)
	}

	// after nonae, but before idus
	if (day > nonae) {
		return rewritePridie(
			`Ante diem ${IntToRoman(idus - day + 1)} Idus ` +
			`${GetLatinMonthName(month, CASE.ACCUSATIVE)} ${IntToRoman(year)}`
		)
	}

	// after kalendae, but before nonae => like "if (day > kalendae)"
	return rewritePridie(
		`Ante diem ${IntToRoman(nonae - day + 1)} Nonas ` +
		`${GetLatinMonthName(month, CASE.ACCUSATIVE)} ${IntToRoman(year)}`
	)
}
