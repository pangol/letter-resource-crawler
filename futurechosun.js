#!/usr/bin/node
const cheerio = require('cheerio')
const moment = require('moment')
const fetch = require('./fetch.js')
const isDiffOneDays = require('./isDiffOneDays')
const append = require('../google_sheet_uploader/index.js')

const DATE_FORMAT = 'YYYY.MM.DD'

const name = '더 나은 미래'
const url = 'http://futurechosun.com/all'
const articleListSelector = '.grid > div'

var process = function (url) {
    var devs = [
        [''],
        [name],
    ];
    fetch(url)
        .then(function (body) {
            $ = cheerio.load(body);
            return $();
        })
        .then(function (rows) {
            rows.each(function () {
                var dev = [
                    $(this).find('.title').eq(0).text().trim(), //title
                    $(this).find('.date').eq(0).text().trim(), //date
                    $(this).find('a').attr('href') //link
                ];
                if(isDiffOneDays(dev[1], DATE_FORMAT))
                    devs.push(dev);
            });
        })
        .then(function () {
            devs.push([''])
            console.log(devs)
            append(devs)
        })
}


process(url)

