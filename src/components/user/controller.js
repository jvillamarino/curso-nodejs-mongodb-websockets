const store = require('./store');

function getAll(filterByName) {
    return new Promise((resolve, reject) => {
        resolve(store.getAll(filterByName));
    });
}

function getById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await store.getOne(id);
            if (data) return resolve(data)

            console.error(`[User - Controller]: No se encontraron registros para el id: ${id}`);
            return reject({ 'message': 'No se encontraron datos', statusCode: 404 });
        } catch (err) {
            console.error(`[User - Store]: Se presento un error al consultar data con id: ${id}, \n MESSAGE: ${err.message}, \n REASON:${err.reason}`);
            reject({ 'message': 'Se ha presentado un error, intenta mas tarde', statusCode: 422 })
        }
    })
}

function createUser({ file, ...rest }) {
    return new Promise(async (resolve, reject) => {
        try {
            let fileData = undefined;
            if (file) {
                const { path, ...fileRest } = file;
                const filename = `http://localhost:3000/${path}`
                fileData = { ...fileRest, filename };
            }

            resolve(store.add({ ...rest, file: fileData }));
        } catch (err) {
            console.log(err);
            const requiredFields = Object.keys(err.errors).join(', ');
            console.error(`[User - Controller]: Error al guardar los datos. \n MESSAGE: ${err.message}`)
            reject({ 'message': `Faltan datos requeridos: ${requiredFields}`, statusCode: 400 });
        }
    })
}

function updateUser(id, data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await store.update(id, data);
            if (response) return resolve(response);
            return reject({ 'message': `No se encontro registro con el id: ${id}`, statusCode: 404 })
        } catch (err) {
            console.error(`[User - Controller]: Error al actualizar los datos. \n MESSAGE: ${err.message}`)
            reject({ 'message': `Error al actualizar el registro con id: ${id}`, statusCode: 422 });
        }
    });
}

function deleteUser(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await store.deleteOne(id);
            if (response) return resolve(`Se elimino el registro con id: ${id} exitosamente`);

            return reject({ 'message': `No se encontro registro con el id: ${id}`, statusCode: 404 })
        } catch (err) {
            console.error(`[User - Store]: Se presento un error al consultar data con id: ${id}, \n MESSAGE: ${err.message}, \n REASON:${err.reason}`);
            reject({ 'message': 'Se ha presentado un error, intenta mas tarde', statusCode: 422 })
        }
    })
}

function deleteAll() {
    return new Promise(async (resolve, reject) => {
        const response = await store.deleteAll();
        console.log(response);
        if (response) return resolve('Se eliminaron todos los datos por completo');
    })
}

module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser,
    deleteAll
}
