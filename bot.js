var CONFIG = require('./config');



/*= Slack Node
-------------- */

var Slack = require('slack-node');
var slack = new Slack(CONFIG.token);



/*= Constructor
--------------- */


function Bot(channel, username) {

    var self = this;

    this.timer;

    this.username = username;
    this.channel = channel;


    /* set timers
    ------------- */


    this._set = function(callback, duration, message) {

        /* stop current timeout
        ----------------------- */

        if (typeof this.timer !== 'undefined')
            clearTimeout(this.timer);


        /* post to slack
        ---------------- */

        slack.api('chat.postMessage',
            { 
                username: 'slacodoro',
                icon_emoji: ':tomato:',
                text: '@' + self.username + ': ' + message,
                channel: self.channel            
            }
        );


        /* set timeout
        -------------- */

        this.timer = setTimeout(callback, duration);
    }



    /* stop all timers 
    ------------------ */

    this.stop = function() {
        clearTimeout(this.timer);
    }

    /* start work timer
    ------------------- */


    this.start = function() {
        self._set(self.pause, CONFIG.workDuration, CONFIG.startText);
    }


    /* start pause timer
    -------------------- */

    this.pause = function() {
        self._set(self.start, CONFIG.pauseDuration, CONFIG.pauseText);
    }
}


/* export constructor
--------------------- */

module.exports = Bot;
