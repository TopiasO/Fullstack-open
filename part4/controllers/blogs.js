const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    logger.info("req")
    logger.info(request)
    logger.info("body")
    logger.info(body)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })
    
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id).exec()
  if (blog) {
    blog.title = body.title
    blog.author = body.author
    blog.url = body.url
    blog.likes = body.likes
  } else {
    response.status(404).end()
  }


  const updatedBlog = await blog.save()
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter