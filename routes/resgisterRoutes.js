const express = require('express')
const registerControler = require('../controler/registerControler')

const Route = express.Router()



Route.route('/').get(registerControler.getAllRegister).post(registerControler.CreateRegister)
Route.route('/:id').get(registerControler.getRegister).patch(registerControler.updateRegister).delete(registerControler.deleteRehister)

module.exports = Route