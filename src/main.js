import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
// import { SET_PLAY_HISTORY, SET_FAVORITE_LIST } from './store/mutation-types'
// import { loadPlay, loadFavorite } from 'common/js/cache'
import { processSongsUrl } from 'common/js/song'

import '@/common/stylus/index.styl'

fastclick.attach(document.body)
Vue.config.productionTip = false

Vue.use(vueLazyLoad, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
