require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_Url = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_Url
  : process.env.MONGODB_Url

module.exports = {
  MONGODB_Url,
  PORT
}