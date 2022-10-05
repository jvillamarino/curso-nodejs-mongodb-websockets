const middlewares = require('./middlewares');
const express = require('express');
const bodyParser = require('body-parser');
const response = require('./network/response');
const PORT = 3000;


const app = express();
const router = express.Router();

// Add Router & bodyParser Middleware

const getHeaders = (req, res, next) => {
    console.log(req.headers);
    next();
}
app.use(express.static('public'));
app.use([bodyParser.json(), getHeaders, router,]);



const jobs = [
    { title: 'Backend Developer', experience: '+5 years', description: 'Create beautiful interface and improve de user experience of current pages' },
    { title: 'Software Developer', experience: '+5 years', description: 'Create beautiful interface and improve de user experience of current pages' },
    { title: 'Frontend Engineer', experience: '+5 years', description: 'Create beautiful interface and improve de user experience of current pages' },
    { title: 'Software Engineer', experience: '+5 years', description: 'Create beautiful interface and improve de user experience of current pages' },
]



// Resolve / path
// app.use('/', (req, res, next) => {
//     console.log('Usando el use');
//     next();
// });

// Resolve /sayhello path
// app.use('/sayhello', [...middlewares.mdls], (req, res) => {
//     res.send(`Tu solicitud fue procesada: ${new Date(req.requestTime)}`);
// })

router.get('/jobs', (req, res, next) => {
    response.sucess(req, res, jobs);
});

router.get('/jobs/:id', (req, res) => {
    const { id } = req.params;
    if (jobs?.length && jobs[id]) {
        response.sucess(req, res, jobs[id], 'Encontrado con éxito');
    } else {
        response.error(req, res, 'No se encontraron datos', 404);
    }

});

router.post('/jobs', (req, res, next) => {
    jobs.push(req.body);
    response.sucess(req, res, req.body, 'Registro creado con éxito', 201);
});

router.put('/jobs/:index', (req, res) => {
    const { index } = req.params;
    if (jobs?.length && jobs[index]) {
        jobs[index] = req.body;
        response.sucess(req, res, req.body, 'Registro editado con éxito');
    } else {
        response.error(req, res, `No se encontraron datos para el id: ${index}`, 404);
    }
});

router.delete('/jobs', (req, res) => {
    jobs.length = 0;
    response.sucess(req, res, null, 'Se eliminaron todos los jobs con éxito');
})


router.delete('/jobs/:id', (req, res) => {
    const { id: index } = req.params;
    if (jobs?.length && jobs[index]) {
        jobs.splice(index, 1);
        response.sucess(req, res, null, `Se elimino el registro con id: ${index} exitosamente`)
    } else {
        response.error(req, res, `No se encontró ningún registro con el id: ${index}`, 404);
    }
});


app.listen(PORT, () => {
    console.log(`Escuchando solicitudes en el puerto: ${PORT}`)
});

