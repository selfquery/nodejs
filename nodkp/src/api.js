/***| variables |***/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/***| api settings |***/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/***| routes |***/
app.get('/:channel_id', async (req, res) => {
	console.log(req.params)
});