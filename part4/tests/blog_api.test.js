const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')
const { title } = require('node:process')


describe('when there are some blogs saved initially', () => {


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

  test('Id is not _Id', async () => {
    const response = await api.get('/api/blogs')

    const id = response.body.map(result => result.id)
    assert.ok(id !== undefined)
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Testi',
        author: 'Testaaja',
        url: 'Testi.com',
        likes: 201
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1)

      const titles = blogsAtEnd.map(result => result.title)
      assert(titles.includes('Testi'))
    })
    test('succeeds with 0 likes', async () => {
      const newBlog = {
        title: 'Testi',
        author: 'Testaaja',
        url: 'Testi.com'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
      
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1)

      const likes = blogsAtEnd.map(result => result.likes)
      assert(likes.includes(0))
    })

    test('Fails with status code 400 if data is invalid', async () => {
      const badUrl = {
        title: 'Title',
        author: 'Meika'
      }
      await api
        .post('/api/blogs')
        .send(badUrl)
        .expect(400)


      const badTitle = {
        author: 'Meika',
        url: 'Url'
      }
      await api
        .post('/api/blogs')
        .send(badTitle)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart.at(0)

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
      
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length-1)

      const titles = blogsAtEnd.map(result => result.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart.at(0)

      oldLikes = blogToUpdate.likes
      blogToUpdate.likes = 1

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const likes = blogsAtEnd.map(result => result.likes)
      assert(likes.includes(1))
    })

    test('fails with status code 404 if blog does not exist', async () => {
      const newBlog = {
        title: 'Doesntexist',
        author: "ImNotReal",
        url: "Google.com",
        id: await helper.nonExistingId()
      }
  
      await api
        .put(`/api/blogs/${newBlog.id}`)
        .send(newBlog)
        .expect(404)
  
      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(result => result.title)
      assert(!titles.includes(newBlog.title))
    })
  })



})



after(async () => {
  await mongoose.connection.close()
})