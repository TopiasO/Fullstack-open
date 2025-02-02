const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = [ {likes: 1},
    {likes: 1}, 
    {likes: 5}]

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

test('total likes', () => {
  const blogs = [ {title: "blog", likes: 1},
    {title: "not blog", likes: 1}, 
    {title: "favourite blog", likes: 5}]

  const result = listHelper.totalLikes(blogs)
  assert.strictEqual(result, 7)
})
describe('favorite bolager', () => {
  test('favorite blöck', () => {
    const blogs = [ {title: "blog", likes: 1},
      {title: "not blog", likes: 1},
      {title: "The new thing", likes: 16},
      {title: "favourite blog", likes: 5}]

    const result = listHelper.favoriteBlog(blogs)
    likes = result.likes

    assert.deepStrictEqual(likes, 16)
  })
})

describe('Most blogs', () => {
  test('Author with the most blogs', () => {
    const blogs = [ {title: "blog", likes: 1, author: "1"},
      {title: "not blog", likes: 1, author: "2"},
      {title: "The new thing", likes: 16, author: "2"},
      {title: "favourite blog", likes: 5, author: "2"},
      {title: "another one", likes: 2, author: "1"}]

      const result = listHelper.mostBlogs(blogs)

      assert.deepStrictEqual(result, [{author: "2", blogs: 3}])
  })
})

describe('Most likes', () => {
  test('Author with the most likes', () => {
    const blogs = [ {title: "blog", likes: 1, author: "1"},
      {title: "not blog", likes: 1, author: "2"},
      {title: "The new thing", likes: 16, author: "2"},
      {title: "favourite blog", likes: 5, author: "2"},
      {title: "another one", likes: 2, author: "1"}]

      const result = listHelper.mostLikes(blogs)
      console.log("The result", result)

      assert.deepStrictEqual(result, 1)
  })
})