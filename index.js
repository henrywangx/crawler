var express = require('express');
var fs = require('fs');
var crawler = require('./src/crawler');

var path = 'data/journal_list.txt';
var port = 8000;
app = express();

var array;


function compare(x, y) {
    return (x.time < y.time) ? -1 : 1;
}
(async function () {
    await crawler.crawler();
    array = fs.readFileSync(path, 'utf8');
    array = JSON.parse(array).sort(compare);
    console.log(array);
})();



app.get('/', function (req, res) {
    console.log('visit is comming');
    res.send(array);
}).listen(port);