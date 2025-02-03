const Blog = require('../models/blog')

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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon',
    author: "Idontexist",
    url: "foo.com"
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}