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

	// test Date object
	let two_thousand_four = IsLeapYear(new Date(2004, 1, 1))
	expect(two_thousand_four).toBeTruthy();
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