var Crawler = require('crawler');
var path = require('path');
var fw = require('./fileWriter');
var parser = require('./parser');
// ======= start mongoose code =======
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('[Mongodb]Mongodb connected!');
});
var gifSchema = mongoose.Schema({
    category: String,
    src: String
});
var Gif = mongoose.model('Gif', gifSchema);
// ======= end mongoose code =========

var URL_FILE_NAME = 'cat';
var MAX_GIFS = 100;
var counter = 0;

var c = new Crawler({
    "maxConnections":10,

    // This will be called for each crawled page
    callback: function (error,result,$) {
        // $ is a jQuery instance scoped to the server-side DOM of the page
        // if (counter > MAX_GIFS) {
        //     process.exit(1);
        // }
        // $("img").each( function (index, img) {
        //     if (img.src.indexOf('.gif') === -1) {
        //         return;
        //     } else {
        //         fw.appendPart(img.src);
        //         counter++;
        //     }
        // });
        var gifs = parser.getGifs($);
        console.log(gifs);
    }
});

c.queue("http://giphy.com/categories");