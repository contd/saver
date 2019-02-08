//const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
//const gateman = require("gatemanjs").GateMan(mongoose)
const Logger = require('logplease')
const logger = Logger.create('utils')
const app = require('./app')

const port = process.env.SERVER_PORT || 3334

// MongoDB/Mongoose
mongoose.Promise = global.Promise
let mongoConn = `${process.env.MONGO_ADDRS || 'localhost:27017'}/${process.env.MONGO_DB || 'wbag'}`

if (process.env.MONGO_USER && process.MONGO_USER !== "") {
  mongoConn = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${mongoConn}`;
} else {
  mongoConn = `mongodb://${mongoConn}`
}

//MongoClient
// const murl = `mongodb://${process.env.MONGO_ADDRS || 'localhost:27017'}`
// const dbname = process.env.MONGO_DB || 'wbag'
// const client = new MongoClient(murl)

// Server
app.listen(port, () => {
  mongoose.connect(mongoConn, { useNewUrlParser: true })
  const db = mongoose.connection

  db.on('error', err => {
    logger.error(err)
    process.exit(1)
  })

  db.once('open', () => {
    logger.info(`Connected to Mongo server ${mongoConn}`)
    logger.info(`Express started at http://localhost:${port}`)
  })

  // logger.info(`Express started at http://localhost:${port}`)

  // client.connect(err => {
  //   if (err) {
  //     logger.error(err)
  //     process.exit(1)
  //   }

  //   const db = client.db(dbname)

  //   db.on('error', err => {
  //     logger.error(err)
  //     client.close()
  //   })

  //   db.once('open', () => {
  //     app.db = db
  //     logger.info(`Connected to Mongo server ${murl}`)
  //   })
  // })
})