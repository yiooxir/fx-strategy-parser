import path from 'path';
import winston from 'winston';
import config from 'config';

const logger = config.logger;

// This is singleton
export default new Logger();

function getTime() {

    var offset = logger.timeZoneOffset || 0;
    var d = new Date();
    
    // convert to msec
    // add local time zone offset 
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    
    // create new Date object for different city
    // using supplied offset
    return new Date(utc + (3600000*offset)).toISOString();
}

function Logger() {

    // Create logger
    winston.remove(winston.transports.Console);

    winston.add(winston.transports.Console, {
        level: logger.level,
        timestamp: getTime,
        colorize: true,
    });

    winston.add(winston.transports.File, {
        level: logger.level,
        timestamp: getTime,
        colorize: true,
        filename: path.resolve(__dirname + logger.path, logger.filename),
        maxsize: 1024*1024,
        maxFiles: 5,
        json: false
    });

    /**
     * Public logging interface
     */
    this.verbose = function() {
        winston.verbose.apply(this, arguments);
    }

    this.info = function() {
        winston.info.apply(this, arguments);
    }

    this.error = function() {
        winston.error.apply(this, arguments);
    }

    this.warn = function() {
        winston.warn.apply(this, arguments);
    }

    this.debug = function() {
        winston.debug.apply(this, arguments);
    }
}