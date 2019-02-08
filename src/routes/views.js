const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const Link = require('../models/Link')
const tags = require('../models/tags.json')
const Logger = require('logplease')
const logger = Logger.create('utils')
const TurndownService = require('turndown')
const turndownPluginGfm = require('turndown-plugin-gfm')

const options = {
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
}
const turndownService = new TurndownService(options)
const gfm = turndownPluginGfm.gfm
const tables = turndownPluginGfm.tables
const strikethrough = turndownPluginGfm.strikethrough
turndownService.use([gfm, tables, strikethrough])

const setDataObj = (req, idchk) => {
  let data = req.body || {}
  if (idchk && !data._id) {
    data = Object.assign({}, data, { _id: req.params.id })
  }
  return data
}

const whichView = (req) => {
  if (req.query.view && req.query.view === 'list') {
    return 'list'
  } else {
    return 'index'
  }
}

const switchView = (view, url) => {
  if (view === 'list') {
    return {
      label: 'Cards',
      url: url,
      type: 'cards'
    }
  } else {
    return {
      label: 'List',
      url: url,
      type: 'list'
    }
  }
}

//=============== Handlebars Rendered routes ============================================================
// GET /
router.get('/', (req, res) => {
  const queryPromise = Link.find({ is_starred: true }).sort({created_at: -1}).exec()
  const view = whichView(req)

  queryPromise.then(links => {
    res.render(view, {links: links, tags: tags, view: switchView(view, '/') })
  })
  .catch(err => {
    logger.error(err)
    res.render(view,  {links: null, tags: tags, view: switchView(view, '/') })
  })
})
//
// GET /by/:tag
router.get('/by/:tag', (req, res) => {
  const tag = req.params.tag
  const queryPromise = Link.find({ is_archived: false, tags: tag }).sort({created_at: -1}).exec()
  const view = whichView(req)

  queryPromise.then(links => {
    res.render(view, {links: links, tags: tags, tag: tag, view: switchView(view, `/by/${tag}`) })
  })
  .catch(err => {
    logger.error(err)
    res.render(view, {links: null, tags: tags, error: err, view: switchView(view, `/by/${tag}`) })
  })
})
//
// GET /archive
router.get('/archive', (req, res) => {
  const tag = 'javascript'
  const queryPromise = Link.find({ is_archived: true, tags: tag }).sort({created_at: -1}).exec()
  const view = whichView(req)

  queryPromise.then(links => {
    res.render(view, {links: links, tags: tags, tag: tag, archive: true, view: switchView(view, `/archive`) })
  })
  .catch(err => {
    logger.error(err)
    res.render(view, {links: null, tags: tags, error: err, archive: true, view: switchView(view, `/archive`) })
  })
})
//
// GET /archive/:tag
router.get('/archive/:tag', (req, res) => {
  const tag = req.params.tag
  const queryPromise = Link.find({ is_archived: true, tags: tag }).sort({created_at: -1}).exec()
  const view = whichView(req)

  queryPromise.then(links => {
    res.render(view, {links: links, tags: tags, tag: tag, archive: true, view: switchView(view, `/archive/${tag}`) })
  })
  .catch(err => {
    logger.error(err)
    res.render(view, {links: null, tags: tags, error: err, archive: true, view: switchView(view, `/archive/${tag}`) })
  })
})
//
// GET /contents/:id
router.get('/contents/:id', (req, res) => {
  const queryPromise = Link.find({ _id: req.params.id }).exec()

  queryPromise.then(doc => {
    res.render('contents', {layout: 'details', links: doc, error: null })
  })
  .catch(err => {
    logger.error(err)
    res.render('error', { links: null, error: err })
  })
})
//
// GET /editor/:id
router.get('/editor/:id', (req, res) => {
  const queryPromise = Link.find({ _id: req.params.id }).exec()

  queryPromise.then(doc => {
    res.render('editor', {links: doc, error: null })
  })
  .catch(err => {
    logger.error(err)
    res.render('error', { links: null, error: err })
  })
})
//
// TOGGLE /starred/:id (toggle starred)
router.get('/starred/:id', (req, res) => {
  const findBy = { _id: req.params.id }
  const options = { new: false }
	const refer = req.get('Referrer')

  Link.findById(findBy, (err, link) => {
    if (err) {
      logger.error(err)
      res.redirect(refer)
    } else {
      const data = Object.assign({}, req.body, { is_starred: !link.is_starred })

      Link.findOneAndUpdate(findBy, data, options, (err, updLink) => {
        if (err) {
          logger.error(err)
        } else {
          logger.info(`Toggled ${link._id}: ${!updLink.is_starred}`)
        }
        res.redirect(refer)
      })
    }
  })
})
//
// TOGGLE /archive/:id
router.get('/archived/:id', (req, res) => {
  const findBy = { _id: req.params.id }
  const options = { new: false }
	const refer = req.get('Referrer')

  Link.findById(findBy, (err, link) => {
    if (err) {
      logger.error(err)
      res.redirect(refer)
    } else {
      const data = Object.assign({}, req.body, { is_archived: !link.is_archived })

      Link.findOneAndUpdate(findBy, data, options, (err, updLink) => {
        if (err) {
          logger.error(err)
        } else {
          logger.info(`Toggled ${link._id}: ${!updLink.is_archived}`)
        }
        res.redirect(refer)
      })
    }
  })
})
//
// DELETE /remove/:id
router.get('/remove/:id', (req, res) => {
  const findBy = { _id: req.params.id }
	const refer = req.get('Referrer')

  Link.findByIdAndDelete(findBy, (err, doc) => {
    if (err) {
      logger.error(err)
    } else {
      logger.info(`Deleted: ${doc._id}`)
    }
    res.redirect(refer)
  })
})
//
// PUT /save?url=...
router.get('/save', (req, res) => {
  // First run url through mercury
  const srcUrl = req.query.url
  const defTag = req.query.tag || 'javascript'
  const mercUrl = `https://mercury.postlight.com/parser?url=${srcUrl}`
	const refer = req.get('Referrer') || '/'

  rp({
    uri: mercUrl,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'hkvzdwNZp1OqdaOF9LRzbtDMKyqZFMWGcGZDXttc'
    },
    json: true
  })
    .then(async response => {
      let contentMD = ''
      // Make markdown version
      try {
        contentMD = await turndownService.turndown(response.content)
      } catch(err) {
        logger.error(`Error Creating Markdown: ${err}`)
      }
      // Now we can save it with a little modification
      const newEntry = {
        title: response.title,
        url: response.url,
        reading_time: Math.round(response.word_count/130),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        domain_name: response.domain,
        preview_picture: response.lead_image_url || null,
        content: response.content,
        marked: contentMD,
        tags: [defTag],
        is_starred: true,
        is_archived: false,
        cached: {
          status: 'NONE',
          filename: null,
          fullpath: null
        }
      }
      // Adde to database
      await Link.create(newEntry, (err, newLink) => {
        if (err) {
          logger.error(err)
        } else {
          logger.info(`Created new link: ${newLink.url} ${newLink.id}`)
        }
        res.redirect(refer)
      })
    })
    .catch(error => {
      logger.error(error)
      res.redirect(refer)
    })
})

module.exports = router
