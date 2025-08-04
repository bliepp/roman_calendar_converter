import { DateToRoman } from "./converter";
import "./index.scss";


window.addEventListener("load", () => {
	// get DOM elements
	const form = document.querySelector("form");
	const dayField = form.querySelector("input#day");
	const monthField = form.querySelector("input#month");
	const yearField = form.querySelector("input#year");
	const submitBtn = form.querySelector("button[type=submit");
	const outputField = form.querySelector("input:read-only");

	// set default values
	let now = new Date();
	dayField.placeholder = ("0" + now.getDate().toString()).slice(-2);
	monthField.placeholder = ("0" + (now.getMonth() + 1).toString()).slice(-2);
	yearField.placeholder = now.getFullYear().toString();

	// select text on click on read-only fields
	document.querySelectorAll("input.select").forEach(e => {
		e.addEventListener("click", () => e.select());
	});

	// do something on form submit
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		// get field values
		let year = parseInt(yearField.value || yearField.placeholder),
			month = parseInt(monthField.value || monthField.placeholder),
			day = parseInt(dayField.value || dayField.placeholder);

		// get correct Date object
		let date = new Date(year, month - 1, day); // month is index in Date object
		date.setFullYear(year); // needed so the years 0-99 do not map to 1900-1999

		// convert or show error messages
		try {
			if (year <= 0) {
				throw "Year must be a positive integer"
			}

			if (month < 1 || month > 12) {
				throw "Month must be between 1 and 12"
			}

			if (date.getMonth() !== month - 1) { // only happening if day is <= 0 or more than month's highest date
				throw `Day must be between 1 and ${(new Date(year, month, 0)).getDate()} for ${(new Date(year, month, 0)).toLocaleString('en', { month: 'long' })}`
			}

			outputField.value = DateToRoman(date);
			outputField.removeAttribute("disabled");
		} catch (error) {
			outputField.value = error;
			outputField.setAttribute("disabled", "");
		}
	});

	submitBtn.click(); // submit once on page load
});
