// http://code4node.com/snippet/web-scraping-with-node-and-phantomjs

import request from 'request';
import cheerio from 'cheerio';
import config from 'config';
import async from 'async';
import { logger, saveToDb } from './';


var dataStore = []; 

/* convert int to int, percent to string */
function normalizePropData(str) {
    return str.indexOf('%') === -1 ? parseInt(str) : str;
}

/* generate new delay in sec */
function getDelay () {
    const {min, max} = config.delay;
    return Math.floor(Math.random() * (max - min) + min) * 1000;
}

/* map table properties */
const props = {
    0: 'growth',
    1: 'subscribers',
    2: 'weeks',
    3: 'trades',
    4: 'win',
    5: 'profitFactor',
    6: 'maxDD'
}

/* parse data from web page */
export function fetchPageData(url, callback) {
    request(url, function(err, res, body) {
        if (err) return callback(err);

        let $ = cheerio.load(body, {
            xmlMode: true,
            lowerCaseTags: true
        });

        let $signals = $('.signal');
        let data = [];

        /* parse data */
        $signals.each((i, el) => {
            let object = {};
            let $head = $(el).find('.heading a');
            let $numbers = $(el).find('.numbers dd');

            object.name = $head.text().replace(/\r?\n|\r/g, '').trim();
            object.id = $head.attr('href').split('/').pop()*1;

            $numbers.each((i, el) => {
                object[props[i]] = normalizePropData($(el).text());
            })

            data.push(object);
        })

        /* return data */
        callback(null, data);
    })

}


export function fetchPageCount (url, callback) {
    request(url, function(err, res, body) {

        if (err) return callback(err);

        let $ = cheerio.load(body);
        let max = 0; 

        $('.paginatorEx a').each((i, el) => {
            if (i) {
                let tempN = el.attribs.href.split('page')[1]*1;
                max = tempN > max ? tempN : max;
            }
        });

        callback(null, max);
    })

}

/* start parsing */
export function start(callback) {
    if (dataStore.length) return callback(Error('parsing already started'));

    let i = 0;
    const {parsingUrl, maxPages} = config;

    /* clear store */
    dataStore = [];

    /* exit function */
    function match() {
        return i < maxPages;
    }

    /* call parsing with delay */
    function query(done) {
        ++i;

        let q = setTimeout(() => {
            logger.info(`Parsing the page launched. // ${parsingUrl}/page${i}`);

            fetchPageData(`${parsingUrl}/page${i}`, function(err, data) {
                err ?
                    logger.error('Parsing failed', err) :
                    logger.info(`Parsing the page is finished. ${data.length} objects parsed`); 

                dataStore.push(...data);
                done();
            });

        }, getDelay());
    }
    
    /* start web resource parsing */
    async.whilst(match, query, err => {
        if (err) {
            logger.error(err);
        } else {
            saveToDb(dataStore, callback);
        }
    });
}