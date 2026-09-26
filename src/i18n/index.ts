import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enLogin from './locales/en/Login.json'
import enRegister from './locales/en/Register.json'
import enConfirmEmail from './locales/en/ConfirmEmail.json'
import enOnboarding from './locales/en/Onboarding.json'
import enCommon from './locales/en/common.json'
import enHome from './locales/en/Home.json'

import roLogin from './locales/ro/Login.json'
import roRegister from './locales/ro/Register.json'
import roConfirmEmail from './locales/ro/ConfirmEmail.json'
import roOnboarding from './locales/ro/Onboarding.json'
import roCommon from './locales/ro/common.json'
import roHome from './locales/ro/Home.json'

import huLogin from './locales/hu/Login.json'
import huRegister from './locales/hu/Register.json'
import huConfirmEmail from './locales/hu/ConfirmEmail.json'
import huOnboarding from './locales/hu/Onboarding.json'
import huCommon from './locales/hu/common.json'
import huHome from './locales/hu/Home.json'

const resources = {
  ro: {
    Login: roLogin,
    Register: roRegister,
    ConfirmEmail: roConfirmEmail,
    Onboarding: roOnboarding,
    Common: roCommon,
    Home: roHome,
  },
  en: {
    Login: enLogin,
    Register: enRegister,
    ConfirmEmail: enConfirmEmail,
    Onboarding: enOnboarding,
    Common: enCommon,
    Home: enHome,
  },
  hu: {
    Login: huLogin,
    Register: huRegister,
    ConfirmEmail: huConfirmEmail,
    Onboarding: huOnboarding,
    Common: huCommon,
    Home: huHome,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'ro',
  fallbackLng: 'ro',
  supportedLngs: ['ro', 'en', 'hu'],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
