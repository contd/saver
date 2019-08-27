import Vue from 'vue'
import moment from 'moment'
import { AllHtmlEntities } from 'html-entities'
// import axios from 'axios'
// import fs from 'fs'
// import path from 'path'
// import parse from 'url-parse'

const entities = new AllHtmlEntities()

Vue.filter("humanFormat", timeStr => {
  return moment(timeStr).format("ddd, MMM Do YYYY")
})

Vue.filter("machineFormat", timeStr => {
  return moment(timeStr).format("YYYY-MM-DD hh:mm:ss A")
})

Vue.filter("escapeEntities", str => {
  return entities.encode(str).replace(/:/g, '&colon;')
})

Vue.filter("trimImgUrl", imgUrl => {
  return (imgUrl ? JSON.stringify(imgUrl).replace(/"/g,'') : '/tags/javascript.png')
})

Vue.filter("wrootReplace", content => {
  return (content ? content.replace(/http:\/\/wbag\.kumpf\.home\/assets\/images/g, '/cache') : content)
})

Vue.filter("readingTime", readTime => {
  return (readTime <= 1 ? "<1" : Math.round(readTime))
})

Vue.filter("codeReplace", content => {
  let replContent = content.replace(/<pre class="\w+">/g, '<pre><code class="javascript">')
  replContent = replContent.replace(/<\/pre>/g, '</code></pre>')
  replContent = replContent.replace(/http:\/\/wbag\.kumpf\.home\/assets\/images/g, '/cache')
  return replContent
})

Vue.filter("cachedImg", (imgUrl, imgId, tags) => {
  let prevPic = JSON.stringify(imgUrl).replace(/"/g,'')
  const tag = tags ? tags[0] : 'javascript'
  let defaultImg = `/tags/${tag}.png`

  if (prevPic !== null) {
    if (prevPic.startsWith('http://wbag.kumpf.home')) {
      prevPic = prevPic.replace('http://wbag.kumpf.home/assets/images', '/cache')
      return prevPic
    } else if (prevPic.startsWith('/cache')) {
      return prevPic
    } else {
      // const url = parse(prevPic)
      // let fname = path.basename(url.pathname)
      // const exten = path.extname(fname)
      // // Get error if path/filename is more than 256 (play safe with 255)
      // if (fname.length > 255) {
      //   // because path to filename can already be long
      //   fname = `${fname.substr(0, 100)}${exten}`
      // }
      // fname = fname.replace(/ /g,'_')
      // fname = fname.replace(/%20/g,'_')

      // const filename = `${imgId}__${fname}`
      // const filepath = path.resolve(__dirname, '..', 'public', 'cache', filename)

      // if (fs.existsSync(filepath)) {
      //   return `/cache/${filename}`
      // } else {
      //   axios({
      //     method: 'GET',
      //     url: prevPic,
      //     responseType: 'stream'
      //   })
      //   .then(response => {
      //     response.data.pipe(fs.createWriteStream(filepath))
      //     defaultImg = `/cache/${filename}`
      //   })
      //   .catch(error => {
      //     console.log(`Cached ERROR: ${error.message}`)
      //   })
      //   .finally(() => {
      //     return defaultImg
      //   })
      // }
      return prevPic
    }
  } else {
    return defaultImg
  }
})