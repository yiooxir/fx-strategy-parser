import should from 'should';
import {fetchPageCount, fetchPageData} from '../utils';


let dom;

describe('fetchPageCount', () => {

    it('should be 123', done => {
        fetchPageCount('https://www.mql5.com/ru/signals/mt4', (err, data) => {
            console.log('******** max page counting. See: https://www.mql5.com/ru/signals/mt4 *****')
            err ? console.log(err) :
                  console.log('max page amount is', data);
            done();
        })
    })
})

describe('fetchPageData', () => {

    it('should be 123', done => {
        fetchPageData('https://www.mql5.com/ru/signals/mt4', (err, data) => {
            console.log('******** page data. See: https://www.mql5.com/ru/signals/mt4 *****')
            err ? console.log(err) :
                  console.log('fetched data', data);
            done();
        })
    })
})