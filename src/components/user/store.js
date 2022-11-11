
const Model = require('./model');


function getAll(filterByName) {
    const filter = filterByName ? { name: { '$regex': filterByName, '$options': 'i' } } : null;
    return Model.find(filter);
}

function getOne(id) {
    return Model.findById(id);
}

function create(data) {
    return new Model(data).save();
}

function updateOne(id, data) {
    return Model.findByIdAndUpdate(id, data, { returnDocument: 'after' });
}

function deleteOne(id) {
    return Model.findByIdAndDelete(id);
}

function deleteAll() {
    return Model.deleteMany();
}

module.exports = {
    getAll,
    getOne,
    add: create,
    update: updateOne,
    deleteOne,
    deleteAll
}