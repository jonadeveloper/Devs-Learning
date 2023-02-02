"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const server = (0, express_1.default)();
server.use(bodyParser.json());
server.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
server.get("/", (_req, res) => {
    console.log("Ok");
    res.send("Server Run");
});
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`);
});
//module.exports = server;
