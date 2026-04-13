const mongoose = require('mongoose');
const config = require('./index');

const db = mongoose.connect(config.mongo_uri, {useNewUrlParser: true})
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.error('An Error Has Occured', err));

module.exports = db;