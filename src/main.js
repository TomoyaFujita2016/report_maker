import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@/assets/css/vuetify-override.css'
import ScrollDiv from 'vue-scroll-div';

Vue.use(ScrollDiv);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
