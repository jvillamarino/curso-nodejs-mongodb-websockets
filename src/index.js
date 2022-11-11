const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const routingApp = require('./network/routes');
const connectMongoDB = require('./db');

const PORT = 3000;
const app = express();

// Add Router & bodyParser Middleware

const getHeaders = (req, res, next) => {
    console.log(req.auth);
    next();
}
app.use('/public', express.static('public'));
app.use([bodyParser.json(), getHeaders]);
connectMongoDB();
routingApp(app);



app.listen(PORT, () => {
    console.log(`Escuchando solicitudes en el puerto: ${PORT}`)
});

