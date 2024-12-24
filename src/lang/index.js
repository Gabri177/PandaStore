import { createI18n } from 'vue-i18n';
import en from './en.json';
import zh from './zh.json';
import es from './es.json';


let panda_language = localStorage.getItem('panda_language');
if (panda_language) {
  localStorage.setItem('panda_language', panda_language);
}else{
  localStorage.setItem('panda_language', 'es');
  panda_language = 'es';
}
export const lang = createI18n({
  legacy: false,
  locale: panda_language ,
  fallbackLocale: 'zh',
  messages: { en, zh, es },
});

export default lang;
