import "./index.scss";


window.addEventListener("load", () => {
	// get DOM elements
	const form = document.querySelector("form");
	const day = form.querySelector("form input#day");
	const month = form.querySelector("form input#month");
	const year = form.querySelector("form input#year");

	const submit = form.querySelector("button[type=submit");
	const output = form.querySelectorAll("input:read-only");

	// set default values
	let now = new Date();
	day.placeholder = ("0" + now.getDate().toString()).slice(-2);
	month.placeholder = ("0" + (now.getMonth() + 1).toString()).slice(-2);
	year.placeholder = now.getFullYear().toString();

	// do something on form submit
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		let dateString = `
            ${year.value || year.placeholder}
            -${month.value || month.placeholder}
            -${day.value || day.placeholder}
        `.split("\n").map(s => s.trim()).join("");
		let date = Date.parse(dateString);

		console.log(date)
	});
});
