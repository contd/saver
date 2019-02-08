const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const errorhandler = require('errorhandler')
const exphbs  = require('express-handlebars')
const cors = require('cors')
const helmet = require('helmet')
const helpers = require('./tools/helpers')
const views = require('./routes/views')
const api = require('./routes/api')
const anno = require('./routes/anno')

const options = {
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: helpers
}
const app = express()
app.engine('.hbs', exphbs(options))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(cors())
app.use(helmet())
app.use(express.static('public'))
app.use('/', views)
app.use('/api', api)
app.use('/anno', anno)

if (process.env.NODE_ENV !== 'production') {
  app.use(errorhandler())
} else {
  app.use((err, _, res, next) => {
    logger.error(err.stack)
    res.status(500)
    res.render('error', { error: err })
    next(err)
  })
}

module.exports = app