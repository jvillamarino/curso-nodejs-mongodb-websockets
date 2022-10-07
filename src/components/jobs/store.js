const mongoose = require('mongoose');
const Model = require('./model');

mongoose.Promise = global.Promise;

const MONGODB_CONNECTION = 'mongodb+srv://adminCluster:MxRAhlWFBas16A6h@jobs-cluster.2hxofxd.mongodb.net/recruitment?retryWrites=true&w=majority';

mongoose.connect(MONGODB_CONNECTION, (err) => {
    console.log(`[MongoDB]: Client has been connect`);
});


function getAll() {
    return Model.find();
}

async function getOne(id) {
    try {
        const response = await Model.findById(id);
        return response;
    } catch (error) {
        // throw Error(`[JobsStore]: Se presento un error al consultar la data con id: ${id}, err: ${error.message}`);
        console.log(`[JobsStore]: Se presento un error al consultar la data con id: ${id},\n MESSAGE: ${error.message},\n REASON: ${error.reason}`);
        return;
    }
}

function create(data) {
    return new Model(data).save();
}

async function updateOne(id, data) {

    // IMPERATIVE METHOD
    // const job = await getOne(id);
    // if (job) {
    //     job.experience = data.experience;
    //     job.title = data.title;
    //     job.description = data.description;
    //     await job.save();
    // } else {
    //     return;
    // }


    // { upsert: true } -- Sirve para guardar los datos si el registro no existe
    const response = await Model.findByIdAndUpdate(id, data, { returnDocument: 'after' });
    return response;
}

async function deleteAll() {
    return Model.deleteMany();

}

function deleteOne(id) {
    return Model.findByIdAndDelete(id);
}


module.exports = {
    getAll: getAll,
    getOne: getOne,
    add: create,
    update: updateOne,
    deleteAll: deleteAll,
    deleteOne: deleteOne
}
