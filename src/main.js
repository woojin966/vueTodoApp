import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './styles/main.scss'

// i18n
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ko from './locales/ko.json'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from "@fortawesome/free-solid-svg-icons"

library.add(fas);

// 브라우저 언어 감지
const getDefaultLocale = () => {
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith('ko') ? 'ko' : 'en';
};

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: { en, ko }
});

const app = createApp(App);

app.use(i18n);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
