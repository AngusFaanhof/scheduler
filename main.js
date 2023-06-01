const ScheduleInterface = require('./schedule/interface');
const TransportInterface = require('./transport/interface');

const config = require('./config.json');

const schedule = new ScheduleInterface();
const transport = new TransportInterface();

// example usage
(async () => {
	const from = 'Zaandam';
	const to = 'Metro Amstelveenseweg';
	const date = new Date('2023-05-10T12:00:00+01:00');

	const scheduleData = schedule.getDay(date);
	let startTime = new Date(scheduleData[0].start);

	const transportData = await transport.getRoute(from, to, startTime, config.bufferTime);
	console.log(transportData);
})();