const express = require('express');
const urlRoutes = express.Router();

const controller = require('../controllers/user.controller');

urlRoutes.post('/login', controller.login);
urlRoutes.get('/', controller.getAll);
urlRoutes.post('/', controller.create);
urlRoutes.get('/:id', controller.read);
urlRoutes.put('/:id', controller.update);
urlRoutes.delete('/:id', controller.delete);

module.exports = urlRoutes;

