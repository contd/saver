import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as tags from './tags.json'

// Plugins
Vue.use(BootstrapVue)

// Global Intance Properties
Vue.config.productionTip = false
Vue.prototype.$tags = tags
Vue.prototype.$http = axios
Vue.prototype.$baseUrl = 'https://saved.kumpf.io/api'

// Global filters
import './plugins/filters'

// eventBus for child sibling communication
export const eventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
