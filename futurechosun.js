#!/usr/bin/node
const isDiffOneDays = require('./isDiffOneDays')
const process = require('./process.js')

const DATE_FORMAT = 'YYYY.MM.DD'

const name = '더 나은 미래'
const url = 'http://futurechosun.com/all'
const articleListSelector = '.grid > div'


function findAndAppendElems(devs) {
  return function(){
  var dev = [
    $(this).find('.title').eq(0).text().trim(), //title
    $(this).find('a').attr('href'), //link
    $(this).find('.date').eq(0).text().trim(), //date
  ];
  if(isDiffOneDays(dev[2], DATE_FORMAT))
    devs.push(dev);
  }
}

process(name, url, articleListSelector, findAndAppendElems)

