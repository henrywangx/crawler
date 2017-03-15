var request = require('request');
var iconv = require('iconv-lite');

// The start url(小木虫上，计算机应用技术相关的期刊)
const urlStart = "http://muchong.com/bbs/journal_cn.php?tag=%BC%C6%CB%E3%BB%FA%D3%A6%D3%C3%BC%BC%CA%F5"
const regExp = /<th\s+>\s+<a\s+href="(.{30,40})">(.{4,20})<\/a>/ig;


async function getList() {
    return new Promise(function (resolve, reject) {
        console.log('start get list...');
        var link_array = [];
        request({
            url: urlStart,
            encoding: null
        }, function (err, res, body) {
            if (err) {
                console.log('getList err:' + err);
                reject(err);
            } else if (res.statusCode == 200) {
                var html = iconv.decode(body, 'GBK');
                let regRes;
                while ((regRes = regExp.exec(html)) !== null) {
                    link_array.push({
                        link: 'http://muchong.com/bbs/' + regRes[1],
                        name: regRes[2]
                    })
                }
                console.log('Get list OK..');
                resolve(link_array);
            }
        })
    })
}
exports.getList = getList;