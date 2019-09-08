const fs = require('fs')
const path = require('path')
const moment = require('moment')
const axios = require('axios')
const parse = require('url-parse')
const Entities = require('html-entities').AllHtmlEntities
const hljs = require('highlight.js')
const Link = require('../models/Link')
const markdown = require('markdown-it')({
  typographer: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    return ''
  }
})

const entities = new Entities()

exports.moment = (date) => {
  return moment(date).format("ddd, MMM Do YYYY")
}

exports.shortMoment = (date) => {
  return moment(date).format("YYYY-MM-DD hh:mm:ss A")
}

exports.escape = (str) => {
  return entities.encode(str).replace(/:/g, '&colon;')
}

exports.removePrefix = (str) => {
  let newStr = str.replace(/^http\:\/\//, '')
  return newStr.replace(/^https\:\/\//, '')
}

exports.firstTag = (tags) => {
	return tags[0]
}

exports.trim = (imgUrl) => {
  let ppic = JSON.stringify(imgUrl).replace(/"/g,'')
  return ppic
}

exports.wreplace = (content) => {
  let newContent = content.replace(/http\:\/\/wbag\.kumpf\.home\/assets\/images/g, '/cache')
  return newContent
}

exports.readtime = (reading_time) => {
  return (reading_time <= 1 ? "<1" : Math.round(reading_time))
}

exports.markdownit = (content) => {
  const md = markdown.render(content)
  return md
}

exports.codereplace = (content) => {
  let replContent = content.replace(/<pre class="\w+">/g, '<pre><code class="javascript">')
  replContent = replContent.replace(/<\/pre>/g, '</code></pre>')
  replContent = replContent.replace(/http\:\/\/wbag\.kumpf\.home\/assets\/images/g, '/cache')
  return replContent
}

exports.hrefreplace = (content) => {
  return content.replace(/href=\"(.+?)\"/g, (_, p1) => {
    return `href="${p1}" target="_blank"`
  })
}

function updatePrevPic(imgId, prevPic) {
  Link.findById(imgId, (err, entry) => {
    if (err) {
      console.log(`Error getting: ${imgId}`)
      return
    }
    let updEntry = {
      title: entry.title,
      url: entry.url,
      tags: entry.tags,
      is_starred: entry.is_starred,
      is_archived: entry.is_archived,
      reading_time: entry.reading_time,
      created_at: entry.created_at,
      updated_at: entry.updated_at,
      reading_time: entry.reading_time,
      domain_name: entry.domain_name,
      preview_picture: prevPic,
      content: entry.content,
      cached: entry.cached
    }
    const findBy = { _id: imgId }
    const options = { new: false }

    Link.findOneAndUpdate(findBy, updEntry, options, (err, updated) => {
      if (err) {
        console.log(`UPDATE ERROR [${imgId}]: ${err}`)
      } else {
        console.log(`UPDATE SUCCESS: ${imgId} - ${prevPic}`)
      }
    })
  })
}
exports.cached = (imgUrl, imgId, tags) => {
  let ppic = JSON.stringify(imgUrl).replace(/"/g,'')
  const tag = (tags ? tags[0] : 'sites')
  let retImg = `/img/${tag}.png`

  if (ppic !== 'null') {
    // Wallabag already took care of many
    if (ppic.includes('http://wbag.kumpf.home')) {
      ppic = ppic.replace('http://wbag.kumpf.home/assets/images', '/cache')
      return ppic
    } else if (ppic.includes('/cache')) {
      return ppic
    } else {
      const url = parse(ppic)
      let fname = path.basename(url.pathname)

      if (fname.length > 255) {
        fname = fname.substr(0, 100)
      }
      fname = fname.replace(/ /g,'_')
      fname = fname.replace(/%20/g,'_')

      const filename = `${imgId}__${fname}`
      const filepath = path.resolve(__dirname, '..', 'public', 'cache', filename)

      if (fs.existsSync(filepath)) {
        return `/cache/${filename}`
      } else {
        axios({
          method: 'GET',
          url: ppic,
          responseType: 'stream'
        })
        .then(response => {
          response.data.pipe(fs.createWriteStream(filepath))
          retImg = `/cache/${filename}`
          //TODO: Update mongo to reflect this is cached
          updatePrevPic(imgId, retImg)
          return retImg
        })
        .catch(error => {
          retImg = `/img/${tag}.png`
          console.log(`Returning: ${retImg} - ID: ${imgId}`)
          //TODO: Update mongo to reflect this placeholder
          updatePrevPic(imgId, retImg)
          return retImg
        })
      }
    }
  } else {
    return retImg
  }
}
