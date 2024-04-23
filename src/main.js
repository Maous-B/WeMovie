import './assets/main.css'

import '@/assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import VueKinesis from 'vue-kinesis'
import router from "./components/router/router.js";
const app = createApp(App)
app.use(router)
app.use(VueKinesis)
app.mount('#app')
