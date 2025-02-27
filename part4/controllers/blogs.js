const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user && blog && user._id.toString() === blog.user._id.toString() ) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }


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