import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'

import * as tags from './tags.json'
// Global Intance Properties
Vue.config.productionTip = false
Vue.prototype.$tags = tags
Vue.prototype.$baseUrl = "http://localhost:3333/api"

// Global filters
import './plugins/filters'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
