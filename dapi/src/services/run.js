
var RUNNING;

module.exports = (_, io) => {

    /** is running on */
    if (!RUNNING) {

        RUNNING = true;
        /** spawn child process */
        let spawn = require('child_process').spawn;
        let terminal = spawn(_.command, _.params); 

        console.log(`[+] running new command "${_.command} ${_.params}"`);

        /** output to webpage */
        terminal.stdout.on('data', function(data) {
            console.log(data.toString());

            io.emit('data', data.toString());
        });

        /** ouput end to webpage */
        terminal.stdout.on('end', function() {
            io.emit('data', '<br/>Completed.');
            RUNNING = false;
        });
        
    };

};