import devtools from '@vue/devtools'
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import db from './nedb'//订单表

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import alipayhelper from './alipayhelper'

import moment from 'moment'//导入文件

Vue.prototype.$moment = moment;//赋值使用
Vue.prototype.$db = db
Vue.prototype.alipayhelper = alipayhelper;
Vue.use(Antd)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

// if (process.env.NODE_ENV === 'development') {
//     devtools.connect('localhost', '9080')
// }
