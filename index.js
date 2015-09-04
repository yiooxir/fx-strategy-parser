/*
http://catethysis.ru/node-js-cheerio-parser/
*/
import express from 'express';
import request from 'request';
import cheerio from 'cheerio';

/* store requests <async> */
const queryStorage = [];


request('https://www.mql5.com/ru/signals/mt4', function(err, res, body) {
    console.log(123, body);
    let $ = cheerio.load(body);

    console.log($('.details'));
    // console.log(err, res);
})

export default {a:1}