var getList = require('./getList'),
    getComment = require('./getComment');
var fs = require('fs');
var async = require('async');

var path = 'data/journal_list.txt'

//get the journal list
async function crawler() {
    return new Promise(async function (resolve, reject) {
        let temp_array = await getList.getList();
        console.log('start get comment...');
        for (var i in temp_array) {
            temp_array[i] = await getComment.getComment(temp_array[i]);
            console.log(`${temp_array[i].name} is OK`)
        }
        console.log('get comment OK...');
        try {
            fs.writeFileSync(path, JSON.stringify(temp_array), 'utf8')
            console.log('crawler the paper list OK!');
            resolve('crawler OK!');
        } catch (err) {
            console.log('save list err:' + err);
            reject('crawler failed');
        }
    })
}
//crawler();
exports.crawler = crawler;