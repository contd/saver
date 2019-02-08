const express = require('express')
const router = express.Router()
const Link = require('../models/Link')
const Tag = require('../models/Tag')
const Logger = require('logplease')
const logger = Logger.create('utils')

const setDataObj = (req, idchk) => {
  let data = req.body || {}
  if (idchk && !data._id) {
    data = Object.assign({}, data, { _id: req.params.id })
  }
  return data
}

const runQueryRespond = (queryPromise, res, next) => {
  queryPromise.then(docs => {
    res.json(docs)
    next()
  })
  .catch(err => {
    logger.error(err)
    next(err)
  })
}

const updQueryRespond = (queryPromise, res, next) => {
  queryPromise.then(updLink => {
    res.status(200).send(updLink)
    next()
  })
  .catch(err => {
    logger.error(err)
    res.status(500)
    next(new Error(err))
  })
}

const whichToggle = (toggler, req, link) => {
  if (toggler === 'starred') {
    return Object.assign({}, req.body, { is_starred: !link.is_starred })
  } else {
    return Object.assign({}, req.body, { is_archived: !link.is_archived })
  }
}

const toggleOne = (findBy, options, which, req, res, next) => {
  Link.findById(findBy, (err, link) => {
    if (err) {
      logger.error(err)
      next(new Error(err))
    } else {
      const data = whichToggle(which, req, link)

      Link.findOneAndUpdate(findBy, data, options, (err, updLink) => {
        if (err) {
          logger.error(err)
        } else {
          logger.info(`Toggled ${which}: ${link._id}`)
        }
        res.status(200).send(updLink)
        next()
      })
    }
  })
}
//
//=============== REST API routes ========================================================================
//
// GET /api
router.get('/', (_, res, next) => {
  const queryPromise = Link.find({is_archived: false, is_starred: true}).sort({created_at: -1}).exec()
  runQueryRespond(queryPromise, res, next)
})
//
// GET /api/archive
router.get('/archive', (_, res, next) => {
  const tag = 'javascript'
  const queryPromise = Link.find({ is_archived: true, tags: tag}).sort({created_at: -1}).exec()
  runQueryRespond(queryPromise, res, next)
})
// GET /api/archive/:tag
router.get('/archive/:tag', (req, res, next) => {
  const tag = req.params.tag
  const queryPromise = Link.find({ is_archived: true, tags: tag}).sort({created_at: -1}).exec()
  runQueryRespond(queryPromise, res, next)
})
// GET /api/:id
router.get('/:id', (req, res, next) => {
  const queryPromise = Link.findById({ _id: req.params.id }).exec()
  runQueryRespond(queryPromise, res, next)
})
// GET /api/tags
router.get('/tags', (_, res, next) => {
  Tag.find().exec()
	queryPromise.then(tags => {
		res.json(tags)
		next()
	})
	.catch(err => {
		logger.error(err)
		next(err)
	})
})
// GET /api/contents/:id
router.get('/contents/:id', (req, res) => {
  const queryPromise = Link.find({ _id: req.params.id }).exec()
  runQueryRespond(queryPromise, res, next)
})
// PUT /api/:id
router.put('/:id', (req, res, next) => {
  const findBy = { _id: req.params.id }
  const options = { new: false }
  const link = setDataObj(req, true)
  const queryPromise = Link.findOneAndUpdate(findBy, link, options).exec()
  updQueryRespond(queryPromise, res, next)
})
// PUT /api/starred/:id
router.put('/starred/:id', (req, res, next) => {
  const findBy = { _id: req.params.id }
  const options = { new: false }
  toggleOne(findBy, options, 'starred', req, res, next)
})
// PUT /api/archive/:id
router.put('/archive/:id', (req, res, next) => {
  const findBy = { _id: req.params.id }
  const options = { new: false }
  toggleOne(findBy, options, 'archived', req, res, next)
})
// PUT /api/editor/:id
router.put('/editor/:id', (req, res, next) => {
  const findBy = { _id: req.params.id }
  const options = { new: false }
  const data = setDataObj(req, true)
  const queryPromise = Link.findOneAndUpdate(findBy, data, options).exec()
  updQueryRespond(queryPromise, res, next)
})

module.exports = router
