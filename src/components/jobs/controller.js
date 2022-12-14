
const store = require('./store');

function getAll(filterByTitle) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await store.getAll(filterByTitle);
            resolve(response);
        } catch (err) {
            console.error(`[JobsController]: ${err.message}`);
            reject({ 'message': 'No se encontraron datos', statusCode: 404 });
        }
    });
}

function getById(id) {
    return new Promise(async (resolve, reject) => {
        const response = await store.getOne(id);
        if (response) {
            resolve(response);
        } else {
            console.error(`[JobsController]: No existen datos para el id: ${id}`)
            reject({ 'message': 'No se encontraron datos', statusCode: 404 })
        }

    });
}

function createJob({ title, experience, description, userOwner }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await store.add({ title, experience, description, userOwner });
            resolve(response);
        } catch (err) {
            console.error(`[JobsController]: ${err.message}`)
            reject({ 'message': 'Información incompleta', statusCode: 400 });
        }

    });
}

function updateById(id, { title, experience, description }) {
    return new Promise(async (resolve, reject) => {
        if (title && experience && description) {
            const response = await store.update(id, { title, experience, description })
            if (response) {
                resolve(response);
            } else {
                console.error(`[JobsController]: No existen datos para el id: ${id}`)
                reject({ 'message': 'No se encontraron datos', statusCode: 404 });
            }
        } else {
            console.error(`[MessageControler]: Información incompleta`);
            reject({ 'message': 'Datos incompletos', statusCode: 400 });
        }
    })
}

function deleteAll() {
    return new Promise((resolve, reject) => {
        store.deleteAll();
        resolve();
    });
}

function deleteById(id) {
    return new Promise(async (resolve, reject) => {
        if (await store.deleteOne(id)) {
            resolve(`Se elimino el registro con id: ${id} exitosamente`);
        } else {
            reject({ 'message': `No se encontro ningún registro con el id: ${id}`, statusCode: 404 })
        }
    });
}

module.exports = {
    getAll,
    getById,
    createJob,
    updateById,
    deleteAll,
    deleteById
}