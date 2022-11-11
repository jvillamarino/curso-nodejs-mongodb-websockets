const express = require('express');
const multer = require('multer');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');

const upload = multer({ dest: 'public/files/' });


router.get('/', (req, res) => {
    const { name } = req.query;
    controller.getAll(name)
        .then(users => response.sucess(req, res, users))
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    controller.getById(id)
        .then((user) => response.sucess(req, res, user))
        .catch(err => response.error(req, res, err.message, err.statusCode));
})

router.post('/', upload.single('file'), (req, res) => {
    const data = { ...req.body, file: req.file };
    controller.createUser(data)
        .then(() => response.sucess(req, res, null, 'Registro creado con éxito', 201))
        .catch(err => response.error(req, res, err.message, err.statusCode));
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    controller.updateUser(id, req.body)
        .then(() => response.sucess(req, res, null, 'Registro actualizado exitosamente'))
        .catch(err => response.error(req, res, err.message, 400))
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    controller.deleteUser(id)
        .then(message => response.sucess(req, res, null, message))
        .catch(err => response.error(req, res, err.message, err.statusCode))
})

router.delete('/', (req, res) => {
    controller.deleteAll()
        .then(message => response.sucess(req, res, [], message))
})

module.exports = router;