const express = require('express');
const auth = require('../middleware/auth');
const urlRoutes = express.Router();

const controller = require('../controllers/user.controller');

urlRoutes.post('/login', controller.login);
urlRoutes.get('/', auth('admin','user'), controller.getAll);
urlRoutes.post('/', auth('admin'), controller.create);
urlRoutes.get('/:id', auth('admin'), controller.read);
urlRoutes.put('/:id', auth('admin'), controller.update);
urlRoutes.delete('/:id', auth('admin'), controller.delete);

module.exports = urlRoutes;

