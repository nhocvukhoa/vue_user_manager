import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import {
  Checkbox,
  Input,
  Table,
  Card,
  Select,
  Avatar,
  Drawer,
  List,
  Menu,
  Button,
  message
} from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'

window.axiox = axios
const app = createApp(App)

app.use(router)
app.use(Checkbox)
app.use(Input)
app.use(Button)
app.use(Table)
app.use(Card)
app.use(Drawer)
app.use(List)
app.use(Menu)
app.use(Avatar)
app.use(Select)
app.use(createPinia())
app.mount('#app')

app.config.globalProperties.$message = message
