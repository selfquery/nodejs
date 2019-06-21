
require('dotenv').config();

/** variables */
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const path = require('path');
const io = require('socket.io').listen(server);

/** scripts */
const conf = require('./conf.json');

/** set port */
const PORT = process.env.PORT || 8080;
server.listen(PORT);

/** set template engine */
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render(path.join(__dirname, '../views/home'), {
        title:"dapi",
        background_color: conf.background_color,
        text_color: conf.text_color,
        font_size: conf.font_size,
        library: conf.library
    });
});

/** route */
app.get('/api', function (req, res) {

    /** check for and load script object */
    if (!req.query.script) { res.sendStatus(404); return };    
    let _ = conf.library.find(s => s.id === req.query.script);
    if (!_ || !_.enabled) { res.sendStatus(404); return };

    /** render html */
    res.render(path.join(__dirname, '../views/index'), {
        title:"dapi",
        script_id:_.id,
        background_color: conf.background_color,
        text_color: conf.text_color,
        font_size: conf.font_size
    });

    /** run command */
    setTimeout(function () {
        require('./services/run.js')(_, io);
    }, conf.start_delay);

});
