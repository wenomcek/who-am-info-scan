import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import tr from './locales/tr.json';
import nl from './locales/nl.json';
import pl from './locales/pl.json';
import vi from './locales/vi.json';
import th from './locales/th.json';
import cs from './locales/cs.json';
import el from './locales/el.json';
import he from './locales/he.json';
import id from './locales/id.json';
import ro from './locales/ro.json';
import sv from './locales/sv.json';
import da from './locales/da.json';
import fi from './locales/fi.json';
import no from './locales/no.json';
import hu from './locales/hu.json';
import sk from './locales/sk.json';
import uk from './locales/uk.json';
import bg from './locales/bg.json';
import hr from './locales/hr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      it: { translation: it },
      pt: { translation: pt },
      ru: { translation: ru },
      zh: { translation: zh },
      ja: { translation: ja },
      ko: { translation: ko },
      ar: { translation: ar },
      hi: { translation: hi },
      tr: { translation: tr },
      nl: { translation: nl },
      pl: { translation: pl },
      vi: { translation: vi },
      th: { translation: th },
      cs: { translation: cs },
      el: { translation: el },
      he: { translation: he },
      id: { translation: id },
      ro: { translation: ro },
      sv: { translation: sv },
      da: { translation: da },
      fi: { translation: fi },
      no: { translation: no },
      hu: { translation: hu },
      sk: { translation: sk },
      uk: { translation: uk },
      bg: { translation: bg },
      hr: { translation: hr }
    },
    fallbackLng: 'en',
    detection: {
      order: ['navigator', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'],
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;