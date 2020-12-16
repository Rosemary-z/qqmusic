import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button
} from "vant";
import {
  NavBar
} from 'vant';
import {
  Icon
} from 'vant';
import 'vant/lib/index.less';
import './style/index.less';
import './assets/fonts/iconfont.css'

Vue.use(Button)
Vue.use(NavBar)
Vue.use(Icon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')