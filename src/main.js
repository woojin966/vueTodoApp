import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './styles/main.scss'
// i18n
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ko from './locales/ko.json'
const i18n = createI18n({
  legacy: false,
  locale: 'en',      // 기본 영어
  fallbackLocale: 'en',
  messages: { en, ko }
})
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const app = createApp(App)

app.use(i18n)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')