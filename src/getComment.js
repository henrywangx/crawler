var request = require('request');
var iconv = require('iconv-lite');
var fs = require('fs');
var regExp = /<td\s>\s+<b>(\d{1,3})<\/b>%\s+<\/td>\s+<\/tr>\s+<tr>\s+<td\s>[\u4e00-\u9fa5]{4}.{1}<\/td>\s+<td\s>\s[\u4e00-\u9fa5]{2}.{1}<b>(\d+(\.\d+)?)<\/b>/ig;

async function getComment(journal) {
    return new Promise(function (resolve, reject) {
        request({
            url: journal['link'],
            encoding: null
        }, function (err, res, body) {
            if (err) {
                console.log('request err:' + err);
                reject(err);
            } else if (res.statusCode === 200) {
                var html = iconv.decode(body, 'GBK');
                try {
                    var regRes;
                    while ((regRes = regExp.exec(html)) !== null) {
                        journal['acceptP'] = Number(regRes[1]);
                        journal['time'] = Number(regRes[2]);
                    }
                    resolve(journal);
                } catch (err) {
                    console.log(`get comment err:` + err);
                    reject(err);
                }
            }
        })
    })
}
exports.getComment = getComment;