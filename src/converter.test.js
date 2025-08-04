import { expect, test } from "vitest";
import { CASE, DateToRoman, GetLatinMonthName, IntToRoman, IsLeapYear } from "./converter";

test("Roman number converter", () => {
	// test positive integer numbers up to ten
	let one = IntToRoman(1),
		two = IntToRoman(2),
		three = IntToRoman(3),
		four = IntToRoman(4),
		five = IntToRoman(5),
		six = IntToRoman(6),
		seven = IntToRoman(7),
		eight = IntToRoman(8),
		nine = IntToRoman(9),
		ten = IntToRoman(10);
	expect(one).toBe("I");
	expect(two).toBe("II");
	expect(three).toBe("III");
	expect(four).toBe("IV");
	expect(five).toBe("V");
	expect(six).toBe("VI");
	expect(seven).toBe("VII");
	expect(eight).toBe("VIII");
	expect(nine).toBe("IX");
	expect(ten).toBe("X");

	// test fancy high numbers
	let high1 = IntToRoman(87),
		high2 = IntToRoman(1387),
		high3 = IntToRoman(497);
	expect(high1).toBe("LXXXVII");
	expect(high2).toBe("MCCCLXXXVII");
	expect(high3).toBe("CDXCVII");

	// test edge cases
	let zero = IntToRoman(0);
	expect(zero).toBe("0");

	expect(() => IntToRoman(-2462)).toThrowError("\"n\" needs to be non-negative integer")
	expect(() => IntToRoman(3.142)).toThrowError("\"n\" need to be an integer")
});

test("Leap year checker", () => {
	// test some integers
	let two_thousand = IsLeapYear(2000),
		two_thousand_and_one = IsLeapYear(2001),
		eighteen_hundred = IsLeapYear(1800);
	expect(two_thousand).toBeTruthy();
	expect(two_thousand_and_one).toBeFalsy();
	expect(eighteen_hundred).toBeFalsy();

	// test Date object, reminder: month is index starting at 0
	let two_thousand_four = IsLeapYear(new Date(2004, 0, 1)),
		two_thousand_three = IsLeapYear(new Date(2003, 11, 31));
	expect(two_thousand_four).toBeTruthy();
	expect(two_thousand_three).toBeFalsy();
});

test("Latin month name", () => {
	// all months between 1 and 12
	let january = GetLatinMonthName(1, CASE.NOMINATIVE),
		february = GetLatinMonthName(2, CASE.ACCUSATIVE),
		december = GetLatinMonthName(12, CASE.ABLATIVE);
	expect(january).toBe("Ianuarius");
	expect(february).toBe("Februarias");
	expect(december).toBe("Decembribus");

	// all months before 1 and after 12 (thanks to modulo)
	let january2 = GetLatinMonthName(13, CASE.NOMINATIVE),
		december2 = GetLatinMonthName(0, CASE.NOMINATIVE);
	expect(january2).toBe("Ianuarius");
	expect(december2).toBe("December");

	// invalid case
	expect(() => GetLatinMonthName(0, "")).toThrowError();
});

test("Date converter", () => {
	let non_leap_year = 2025, non_leap_year_roman = IntToRoman(non_leap_year);

	/* REMEMBER! VERY IMPORTANT!
	   Date object's month is an index, so January is 0, February is 1, ..., December is 11
	   Highly confusing, really
	 */

	// special days of regular months, e.g. August
	let kalendis = DateToRoman(new Date(non_leap_year, 7, 1)),
		nonis = DateToRoman(new Date(non_leap_year, 7, 5)),
		idibus = DateToRoman(new Date(non_leap_year, 7, 13));

	// should be ablative
	expect(kalendis).toBe(`Kalendis Augustas/Sextilibus ${non_leap_year_roman}`);
	expect(nonis).toBe(`Nonis Augustas/Sextilibus ${non_leap_year_roman}`);
	expect(idibus).toBe(`Idibus Augustas/Sextilibus ${non_leap_year_roman}`);


	// special days of special months, e.g. July
	let kalendis2 = DateToRoman(new Date(non_leap_year, 6, 1)),
		nonis2 = DateToRoman(new Date(non_leap_year, 6, 7)),
		idibus2 = DateToRoman(new Date(non_leap_year, 6, 15));

	// should be ablative
	expect(kalendis2).toBe(`Kalendis Iuliis/Quintilibus ${non_leap_year_roman}`);
	expect(nonis2).toBe(`Nonis Iuliis/Quintilibus ${non_leap_year_roman}`);
	expect(idibus2).toBe(`Idibus Iuliis/Quintilibus ${non_leap_year_roman}`);


	// before special days, one mid-month holiday, one date from the month before
	let pridie_kalendas = DateToRoman(new Date(non_leap_year, 6, 31)),
		ante_diem_3_kalendas = DateToRoman(new Date(non_leap_year, 6, 30)),
		pridie_idus = DateToRoman(new Date(non_leap_year, 2, 14)),
		ante_diem_3_idus = DateToRoman(new Date(non_leap_year, 2, 13)),
		pridie_nonas = DateToRoman(new Date(non_leap_year, 0, 4)),
		ante_diem_3_nonas = DateToRoman(new Date(non_leap_year, 0, 3));

	expect(pridie_kalendas).toBe(`Pridie Kalendas Augustas/Sextilis ${non_leap_year_roman}`);
	expect(ante_diem_3_kalendas).toBe(`Ante diem III Kalendas Augustas/Sextilis ${non_leap_year_roman}`);
	expect(pridie_idus).toBe(`Pridie Idus Martias ${non_leap_year_roman}`);
	expect(ante_diem_3_idus).toBe(`Ante diem III Idus Martias ${non_leap_year_roman}`);
	expect(pridie_nonas).toBe(`Pridie Nonas Ianuarias ${non_leap_year_roman}`);
	expect(ante_diem_3_nonas).toBe(`Ante diem III Nonas Ianuarias ${non_leap_year_roman}`);


	// check newyear
	let pridie_newyear = DateToRoman(new Date(non_leap_year, 11, 31)),
		ante_diem_3_newyear = DateToRoman(new Date(non_leap_year, 11, 30));

	expect(pridie_newyear).toBe(`Pridie Kalendas Ianuarias ${IntToRoman(non_leap_year+1)}`);
	expect(ante_diem_3_newyear).toBe(`Ante diem III Kalendas Ianuarias ${IntToRoman(non_leap_year+1)}`);


	// TODO: check leap year result
});
