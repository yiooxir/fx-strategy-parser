import mongodb from 'mongodb';
import config from 'config';
import logger from './logger';
import async from 'async';


const url = config.db.url;
const MongoClient = mongodb.MongoClient;

function save(db, values, done) {
    const collection = db.collection('strategy');
    collection.insert(values, done);
}

/* 
    data object hash:
    -----------------
    object = {
        id,
        win,
        name,
        weeks,
        maxDD,
        trades,
        growth,
        subscribers,
        profitFactor,
    }

    @param data {array}
*/
export default function saveToDb (data, callback) {

    MongoClient.connect(url, (err, db) => {
        if (err) {
            logger.error('unable to connect to the mongoDb server', err);

        } else {
            async.eachSeries(data, save.bind(this, db), function(err, res) {
                if (err) {
                    logger.error('[saveToDb]', err);

                } else {
                    logger.info('data saved successfuly');
                }

                db.close();
                callback(err, res);
            });
        }
    })
}