// http://code4node.com/snippet/web-scraping-with-node-and-phantomjs

import request from 'request';
import cheerio from 'cheerio';


const fetchQueries = []; 

function normalizePropData(str) {
    return str.indexOf('%') === -1 ? parseInt(str) : str;
}

const props = {
    0: 'growth',
    1: 'subscribers',
    2: 'weeks',
    3: 'trades',
    4: 'win',
    5: 'profitFactor',
    6: 'maxDD'
}


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

export function addFetchQuery (q) {

}

export function start() {

}