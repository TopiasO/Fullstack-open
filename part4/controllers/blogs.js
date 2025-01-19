const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response, next) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

logger.info("Olen täällä")

blogsRouter.post('/', (request, response, next) => {
    const body = request.body
    logger.info("req")
    logger.info(request)
    logger.info("body")
    logger.info(body)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
})

module.exports = blogsRouter