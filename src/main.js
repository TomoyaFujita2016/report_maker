import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@/assets/css/vuetify-override.css'
import '@/assets/css/style.css'
import ScrollDiv from 'vue-scroll-div';
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(ScrollDiv);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
