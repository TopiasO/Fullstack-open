require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_Url = process.env.MONGODB_Url

module.exports = {
  MONGODB_Url,
  PORT
}