const express = require('express')
const Routes = express.Router()
const blogControler = require('../controler/blogControler')

Routes.route('/').get(blogControler.getallBlog).post(blogControler.createBlog)
Routes.route('/:id').get(blogControler.getBlog).patch(blogControler.updateBlog).delete(blogControler.deleteBlog)


module.exports = Routes