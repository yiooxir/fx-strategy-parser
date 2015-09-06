/*
http://catethysis.ru/node-js-cheerio-parser/
*/
import express from 'express';
import request from 'request';
import cheerio from 'cheerio';
import shedule from 'node-schedule';


function parse() {

}

schedule.scheduleJob('42 * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
});


request('https://www.mql5.com/ru/signals/mt4', function(err, res, body) {
    console.log(123, body);
    let $ = cheerio.load(body);

    console.log($('.details'));
    // console.log(err, res);
})

export default {a:1}