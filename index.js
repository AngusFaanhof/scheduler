const express = require('express');

const ScheduleInterface = require('./schedule/interface');
const TransportInterface = require('./transport/interface');
const config = require('./config.json');

const app = express();
const scheduleApp = express();
const scheduleInterface = new ScheduleInterface();
const transportInterface = new TransportInterface();

scheduleApp.get('/', (req, res) => {
	const data = scheduleInterface.getAll();

	res.json(data);
});

scheduleApp.get('/day', (req, res) => {
	// add validation
	const datestamp = parseInt(req.query.timestamp, 10);
	const date = new Date(datestamp);

	const data = scheduleInterface.getDay(date);

	res.json(data);
});

app.get('/', (req, res) => {
	  res.send('Welcome to the scheduler app!');
});

app.use('/schedule', scheduleApp);

app.listen(3000, () => {
	  console.log('App listening on port http://localhost:3000');
});