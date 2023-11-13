import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3googlelogin from 'vue3-google-login'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const clientId = '137091647178-tuoku2i1s8i7b7vsmv6taess492sr6dv.apps.googleusercontent.com'
app.use(vue3googlelogin, {
  clientId
})
app.mount('#app')
