const router = require('express').Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', (req, res, next) => {

    const { filterByTitle } = req.query;

    controller.getAll(filterByTitle)
        .then((jobs) => {
            response.sucess(req, res, jobs);
        }).catch((err) => response.error(req, res, err?.message, err?.statusCode))
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    controller.getById(id)
        .then(job => {
            response.sucess(req, res, job, 'Encontrado con éxito');
        })
        .catch(err => {
            response.error(req, res, err?.message, err?.statusCode)
        });
});

router.post('/', (req, res, next) => {
    controller.createJob(req.body)
        .then((data) => {
            response.sucess(req, res, data, 'Registro creado con éxito', 201);
        })
        .catch(err => {
            response.error(req, res, err.message, err.statusCode);
        });
});

router.put('/:index', (req, res) => {
    const { index } = req.params;

    controller.updateById(index, req.body)
        .then((job) => response.sucess(req, res, job, 'Registro editado con éxito'))
        .catch(err => response.error(req, res, err.message, err.statusCode));

});

router.delete('/', (req, res) => {
    controller.deleteAll()
        .then(() => response.sucess(req, res, null, 'Se eliminaron todos los registros con éxito'))
        .catch(err => response.error(req, res, 'Se presento un problema'));

})


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    controller.deleteById(id)
        .then((message) => response.sucess(req, res, null, message))
        .catch(err => response.error(req, res, err.message, err.statusCode))
});


module.exports = router;


// Resolve / path
// app.use('/', (req, res, next) => {
//     console.log('Usando el use');
//     next();
// });

// Resolve /sayhello path
// app.use('/sayhello', [...middlewares.mdls], (req, res) => {
//     res.send(`Tu solicitud fue procesada: ${new Date(req.requestTime)}`);
// })
