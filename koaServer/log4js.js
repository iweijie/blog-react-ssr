const log4js = require('log4js');

const config = {
    "appenders": {
        "console": { "type": 'console' },
        "access": {
            "type": "dateFile",
            "filename": "logs/log_access/access",
            "pattern": "-yyyy-MM-dd",
            "category": "access"
        },
        "errors": {
            "type": "dateFile",
            "filename": "logs/log_errors/errors",
            "pattern": "-yyyy-MM",
            "category": "errors"
        },
        "time": {
            "type": "dateFile",
            "filename": "logs/log_time/time",
            "pattern": "-yyyy-MM",
            "category": "time"
        },
        // "axios": {
        //     "type": "dateFile",
        //     "filename": "./logs/log_axios/axios",
        //     "pattern": "-yyyy-MM",
        //     "category": "axios"
        // }
    },
    "categories": {
        "default": { "appenders": ["console"], "level": "DEBUG" },
        "info": { "appenders": ["access"], "level": "INFO" },
        "err": { "appenders": ["errors"], "level": "ERROR" },
        "time": { "appenders": ["time"], "level": "INFO" },
        // "axios": { "appenders": ["axios"], "level": "INFO" },
    }
}


log4js.configure(config);

module.exports = {
    info: log4js.getLogger('info'),
    time: log4js.getLogger('time'),
    err: log4js.getLogger('err')
}