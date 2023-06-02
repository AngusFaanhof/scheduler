const converter = require('./converter');
const scraper = require('./scraper');

class Schedule {
	constructor() {
		this.data = require('./data.json');
	}

	getAll() {
		return this.data;
	}

	getDay(date) {
		const key = date.toISOString().split('T')[0];
		const data = this.data[key] || {};

		return data;
	}

	getRange(startDate, endDate) {
		let data = {};

		const currentDate = startDate;
		while (currentDate <= endDate) {
			const key = currentDate.toISOString().split('T')[0];

			if (this.data[key])
				data[key] = this.data[key];

			currentDate.setDate(currentDate.getDate() + 1);
		}

		return data;
	}

	async update(username, password) {
		const fileName = await scraper(username, password);
		this.data = converter(fileName);
	}
}

module.exports = Schedule;