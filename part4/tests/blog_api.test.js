const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('Correct JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Correct list length', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

describe('Id format', async () => {
  test('Id is not _Id', async () => {
    const response = await api.get('/api/blogs')

    const id = response.body.map(result => result.id)
    assert.ok(id !== undefined)
  })
})
describe.only('Test adding blogs', async () => {
  let newBlog
  
  beforeEach(() => {
    newBlog = {
      title: 'Uusi blog',
      author: 'Roope',
      url: 'Roope.com'
    }
  })
  test.only('A blog can be added', async () => {


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const allBlogs = blogsAtEnd.map(result => result)

    const blogExists = allBlogs.some(blog => 
      blog.title === 'Uusi blog' &&
      blog.author === 'Roope' &&
      blog.url === 'Roope.com' &&
      blog.likes === 0
    )

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    assert.strictEqual(blogExists, true)
  })
  test.only('Likes has a default value of 0', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const blogLikes = blogsAtEnd.map(result => result.likes)

    assert(blogLikes.includes(0))
  })
  test.only('Blog with missing url or title isnt added', async () => {
    const badBlog = {
      author: "Meika",
    }

    await api
      .post('/api/blogs')
      .send(badBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})



after(async () => {
  await mongoose.connection.close()
})