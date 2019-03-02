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
// GET /api/search?tag=tag&archived=false
router.get('/search', (req, res, next) => {
  const params = {
    is_archived: req.params.archived ? true : false,
    tag: req.params.tag ? req.params.tag : 'javascript'
  }
  const queryPromise = Link.find(params).sort({created_at: -1}).exec()
  queryPromise.then(docs => {
    const results = docs.map(doc => {
      return {
        id: doc._id,
        title: doc.title,
        text: doc.marked,
      }
    })
    res.json(results)
    next()
  })
  .catch(err => {
    logger.error(err)
    next(err)
  })
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
  Link.distinct("tags").sort().exec()
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
router.get('/starred/:id', (req, res) => {
  const findBy = { _id: req.params.id }
  const options = { new: false }

  Link.findById(findBy, (err, link) => {
    if (err) {
      logger.error(err)
      next(err)
    } else {
      const data = Object.assign({}, req.body, { is_starred: !link.is_starred })

      Link.findOneAndUpdate(findBy, data, options, (err, updLink) => {
        if (err) {
          logger.error(err)
        } else {
          logger.info(`Toggled ${link._id}: ${!updLink.is_starred}`)
        }
        res.status(200).send(updLink)
      })
    }
  })
})
// PUT /api/archive/:id
router.get('/archived/:id', (req, res) => {
  const findBy = { _id: req.params.id }
  const options = { new: false }

  Link.findById(findBy, (err, link) => {
    if (err) {
      logger.error(err)
      next(err)
    } else {
      const data = Object.assign({}, req.body, { is_archived: !link.is_archived })

      Link.findOneAndUpdate(findBy, data, options, (err, updLink) => {
        if (err) {
          logger.error(err)
        } else {
          logger.info(`Toggled ${link._id}: ${!updLink.is_archived}`)
        }
        res.status(200).send(updLink)
      })
    }
  })
})
//
// DELETE /remove/:id
router.get('/remove/:id', (req, res) => {
  const findBy = { _id: req.params.id }

  Link.findByIdAndDelete(findBy, (err, doc) => {
    if (err) {
      logger.error(err)
      next(err)
    } else {
      logger.info(`Deleted: ${doc._id}`)
      res.status(200).send(`Deleted: ${doc._id}`)
    }
  })
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
