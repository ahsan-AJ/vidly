const mongoose = require('mongoose');

const server = process.env.MONGODB_URI || 'localhost:27017';
const db = 'vidMosh';

class Database {

    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${db}`, {
            promiseLibrary: global.Promise
        });

        mongoose.connection
            .on('connected', function() {
                console.log('connected to database')
            })
            .on('disconnected', function() {
                console.log('database disconnected')
            })
            .on('error', function(error) {
                console.error(`Mongoose encountered an error ${error}`);
            });

        process.on('SIGINT', function() {
            mongoose.connection.close(function() {
                console.log(`Mongoose app closed due to termination`);
                process.exit(0)
            })
        })


    }

    disconnect() {
        mongoose.connection.close();
    }

}

module.exports = new Database();