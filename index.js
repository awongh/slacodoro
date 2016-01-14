/* ----------------------------------------------------
      ____                            __               
     / __ \____  ____ ___  ____  ____/ /___  _________ 
    / /_/ / __ \/ __ `__ \/ __ \/ __  / __ \/ ___/ __ \
   / ____/ /_/ / / / / / / /_/ / /_/ / /_/ / /  / /_/ /
  /_/    \____/_/ /_/ /_/\____/\__,_/\____/_/   \____/    

  ----------------------------------------------------- */


var express = require('express');
var bodyParser = require('body-parser');



/*= Express config
--------------------------- */

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




/*= Routes
---------- */


var users = {};
var Bot = require('./bot');



app.post('/', function(req, res) {


    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var channel = req.body.channel_id;
    var command = req.body.text.trim();




    /* set response text
    -------------------- */

    var responseText = ':timer_clock: slacodoro started!';




    /* create new user 
    ------------------ */

    if (typeof users[user_id] === 'undefined')
        users[user_id] = new Bot(channel, user_name);




    /* apply command
    ---------------- */

    switch (command) {

        case '':
        case 'start':
            users[user_id].start();
            break;


        case 'pause':
            users[user_id].pause();
            break;


        case 'stop':
            users[user_id].stop();
            delete users[user_id];

            responseText = ':no_entry: slacodoro was stopped!';

            break;

        default:
            responseText = ':boom: Invalid command!';
    }




    /* send response
    ---------------- */

    res.json({
          channel: channel,
          text: responseText
      });

});




/*= Start app
--------------------------- */

app.listen(process.env.PORT || 8888);
