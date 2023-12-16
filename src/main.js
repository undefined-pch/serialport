import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import VScaleScreen from 'v-scale-screen'
import vue3SeamlessScroll from "vue3-seamless-scroll";

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(createPinia())
app.use(VScaleScreen)
app.use(vue3SeamlessScroll)
app.mount('#app')
