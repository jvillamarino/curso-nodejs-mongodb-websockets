const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb+srv://adminCluster:MxRAhlWFBas16A6h@jobs-cluster.2hxofxd.mongodb.net/recruitment?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;

function connectDB() {
    mongoose.connect(MONGODB_URL, (err) => {
        console.log(`[MongoDB]: Conectado a base de datos `);
    });
}

module.exports = connectDB