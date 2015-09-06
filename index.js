/*
http://catethysis.ru/node-js-cheerio-parser/
*/
import request from 'request';
import cheerio from 'cheerio';
import schedule from 'node-schedule';
import { start } from './utils';


schedule.scheduleJob('0 12 * * 1', function(){
    
    console.log('The answer to life, the universe, and everything!');
});


// request('https://www.mql5.com/ru/signals/mt4', function(err, res, body) {
    // console.log(123, body);
    // let $ = cheerio.load(body);
// 
    // console.log($('.details'));
    // console.log(err, res);
// })

// export default {a:1}