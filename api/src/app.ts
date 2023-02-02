import express from "express";
const bodyParser = require('body-parser');
const coursesRoute = require('./routes/courses');
const categoriesRoute = require('./routes/categories');

const server = express();

server.use(bodyParser.json());
server.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
server.use("/courses", coursesRoute);
server.use("/categories", categoriesRoute);


server.use((err: any, _req: any, res: any, _next: any) => { 
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

//Para correr sólo el servidor => ./package.json:   "start": "node build/app.js""

const PORT = 3001;
server.listen(PORT, () => {
    console.log('%s listening at', PORT);
});


//Para correr el servidor y la Db conectados desde index.js => "start": "node index.js"
//Descomentamos la linea de abajo y comentamos la función de arriba

//module.exports = server;
