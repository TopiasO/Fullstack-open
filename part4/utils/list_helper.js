const _ = require('lodash')

const dummy = (blogs) => 1

/*const totalLikes = (blogs) => blogs.reduce((sum, blogs) =>
  sum + blogs.likes, 0)
*/
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blogs) => sum + blogs.likes, 0)
}

const maxLikes = (blogs) => Math.max(...blogs.map(blog => blog.likes))

const favoriteBlog = (blogs) =>  blogs.find(blog => blog.likes === maxLikes(blogs));


const mostBlogs = (blogs) => {
  let blogs_sorted_uniq = _.uniqBy(blogs, 'author')
  const most_active_author = blogs_sorted_uniq.at(-1).author
  

  const blogs_from_single_user = 
  blogs.filter(result => result.author === most_active_author)

  result = [{author: most_active_author, 
    blogs: blogs_from_single_user.length}]

  return result
}

const mostLikes = (blogs) => {
  let blogs_grouped = _.groupBy(blogs, 'author')


  const find_mostLikes = (blogs_grouped) => {
    
    const authors_with_totalLikes = Object.entries(blogs_grouped)
    .map(([author, blogs]) => ({
      author,
      totalLikes: _.sumBy(blogs, 'likes')
    }))

    return authors_with_totalLikes.reduce((max_author, author) =>
      author.totalLikes > max_author.totalLikes ? author : max_author,
      { author: null, totalLikes: 0})
  }
  const author_w_mostLikes = find_mostLikes(blogs_grouped)

  console.log("!!!!!!!!!!!!!!!", author_w_mostLikes)

  return author_w_mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
