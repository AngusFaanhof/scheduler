function getDayOfWeek(date) {
	const dayOfWeek = new Date(date).getDay();

	return [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	][dayOfWeek];
}

function getDateFormatted(datestring) {
	const date = new Date(datestring);
	const monthNumber = date.getMonth();
	const monthString = [
		"Januari",
		"Februari",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	][monthNumber];

	const day = date.getDate();
	const year = date.getFullYear();

	return `${monthString} ${day}, ${year}`;
}

function getEventTime(event) {
	const start = new Date(event.start);
	const end = new Date(event.end);

	let startMinutes = start.getMinutes();
	startMinutes =
		startMinutes < 10 ? `0${startMinutes}` : startMinutes;

	let endMinutes = end.getMinutes();
	endMinutes = endMinutes < 10 ? `0${endMinutes}` : endMinutes;

	return `${start.getHours()}:${startMinutes} - ${end.getHours()}:${endMinutes}`;
}

function getEventDataFromElement(element) {
	const date = element.parentElement.parentElement.getAttribute("date");
	const eventIndex = Array.from(element.parentElement.children).indexOf(element);

	return data[date][eventIndex];
}

module.exports = {
	getDayOfWeek,
	getDateFormatted,
	getEventTime,
	getEventDataFromElement
};