const express = require('express');

const ScheduleInterface = require('./schedule/interface');
const TransportInterface = require('./transport/interface');
const config = require('./config.json');

const app = express();
const scheduleApp = express();
const scheduleInterface = new ScheduleInterface();
const transportInterface = new TransportInterface();

app.set('view engine', 'ejs');

scheduleApp.get('/', (req, res) => {
	const scheduleData = scheduleInterface.getAll();

	res.render('schedule/index', {
		"scheduleData": scheduleData
	});
});

scheduleApp.get('/day', (req, res) => {
	let timestamp = Date.now();

	// add validation
	if (req.query.timestamp)
		timestamp = parseInt(req.query.timestamp, 10);

	const date = new Date(timestamp);
	const data = scheduleInterface.getDay(date);

	// return view of data
	res.json(data);
});

scheduleApp.get('/week', (req, res) => {
	let timestamp = Date.now();

	if (req.query.timestamp)
		timestamp = parseInt(req.query.timestamp, 10);

	const startDate = new Date(timestamp);

	const endDate = new Date()
	endDate.setDate(startDate.getDate() + 7);

	const data = scheduleInterface.getRange(startDate, endDate);

	res.json(data);
});

scheduleApp.get('/month', (req, res) => {
	let timestamp = Date.now();

	if (req.query.timestamp)
		timestamp = parseInt(req.query.timestamp, 10);

	const startDate = new Date(timestamp);

	const endDate = new Date()
	endDate.setMonth(startDate.getMonth() + 1);

	const data = scheduleInterface.getRange(startDate, endDate);

	res.json(data);
});

app.get('/', (req, res) => {
	res.send('Welcome to the scheduler app!');
});

app.get('/today', async (req, res) => {
	const scheduleData = scheduleInterface.getDay(new Date());

	if (Object.keys(scheduleData).length === 0)
		return res.send('No data for today');

	const startTime = new Date(scheduleData[0].start);
	const transportData = await transportInterface.getRoute(
		config.from,
		config.to,
		startTime,
		config.bufferTime
	);

	res.json(transportData);
});

app.use('/schedule', scheduleApp);

app.listen(3000, () => {
	  console.log('App listening on port http://localhost:3000');
});