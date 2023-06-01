const scraper = require('./scraper');

class Transport {
	async getRoute(from, to, datetime=new Date(), bufferTime=0) {
		let data = {};

		let arrivalTime = new Date(datetime);
		arrivalTime.setMinutes(arrivalTime.getMinutes() - bufferTime);

		try {
			data = await scraper(from, to, arrivalTime);
		} catch (e) {
			console.log(e);
		}

		return data;
	}
}

module.exports = Transport;