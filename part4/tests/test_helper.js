const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog1',
    author: 'Sina',
    url: 'Joku.com',
    likes: 1000
  },
  {
    title: 'Blog2',
    author: 'Mina',
    url: 'jokujoku.com',
    likes: 500
  }
]

const initialUsers = [
  {
    username: 'test',
    name: 'test',
    passwordHash: '$2b$10$A9FPqMXUZpxRpTCrxL9mkOubJDLzLIhLnbsSYC2YYM3n9q7w7iow6'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon',
    author: 'Idontexist',
    url: 'foo.com'
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb
}