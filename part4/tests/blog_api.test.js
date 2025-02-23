const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')




describe.only('when there are some blogs saved initially', () => {


  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.insertMany(helper.initialUsers)
  })

  test.only('Correct JSON format', async () => {
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
      const user = helper.initialUsers[0]
      const newBlog = {
        title: 'Testi',
        author: 'Testaaja',
        url: 'Testi.com',
        likes: 201
      }

      const userForToken = {
        username: user.username,
        password: 'salainen'
      }
      const response = await api.post('/api/login').send(userForToken)
      const token = response.body.token

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1)

      const titles = blogsAtEnd.map(result => result.title)
      assert(titles.includes('Testi'))
    })
    test('succeeds with 0 likes', async () => {
      const user = helper.initialUsers[0]
      const newBlog = {
        title: 'Testi',
        author: 'Testaaja',
        url: 'Testi.com'
      }

      const userForToken = {
        username: user.username,
        password: 'salainen'
      }
      const response = await api.post('/api/login').send(userForToken)
      const token = response.body.token

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1)

      const likes = blogsAtEnd.map(result => result.likes)
      assert(likes.includes(0))
    })

    test('Fails with status code 400 if data is invalid', async () => {
      const user = helper.initialUsers[0]
      const badUrl = {
        title: 'Title',
        author: 'Meika'
      }

      const userForToken = {
        username: user.username,
        password: 'salainen'
      }
      const response = await api.post('/api/login').send(userForToken)
      const token = response.body.token

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(badUrl)
        .expect(400)


      const badTitle = {
        author: 'Meika',
        url: 'Url'
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(badTitle)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
    test('Fails with status code 401 Unauthorized if no token is provided', async () => {
      const newBlog = {
        url: 'testischmesti',
        title: 'schmesti',
        author: 'testi',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
        .expect(response => {
          console.log(response.body)
          console.log(response.body.error)
          assert.strictEqual(response.body.error, 'Unauthorized')
        })
    }
    )
  })

  describe.only('deletion of a blog', () => {
    test.only('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = helper.initialBlogs
      const user = helper.initialUsers[0]
      const newBlog = {
        title: 'Delete',
        author: 'Testaaja',
        url: 'Testi.com'
      }

      const userForToken = {
        username: user.username,
        password: 'salainen'
      }
      const response = await api.post('/api/login').send(userForToken)
      const token = response.body.token

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)

      const currentBlogs = await helper.blogsInDb()
      assert.strictEqual(blogsAtStart.length, currentBlogs.length-1)

      const blogs = currentBlogs.filter(result => result.title === newBlog.title)

      await api
        .delete(`/api/blogs/${blogs.at(0).id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

      const titles = blogsAtEnd.map(result => result.title)
      assert(!titles.includes(newBlog.title))
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart.at(0)

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
        author: 'ImNotReal',
        url: 'Google.com',
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


describe('User test', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  describe('Adding a new user', () => {
    test('Succeeds with valid input', async () => {
      const newUser = {
        username: 'New',
        name: 'new',
        password: 'secret'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })
    test('Fails with status 400 with invalid username', async () => {
      const invalidUser = {
        username: '',
        name: 'new',
        password: 'secret'
      }

      await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)
    })
    test('Fails with status 400 with invalid password', async () => {
      const invalidUser = {
        username: 'Name',
        name: 'new',
        password: 's'
      }

      await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)
    })
  })
})



after(async () => {
  await mongoose.connection.close()
})