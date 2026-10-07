export const ASSETS = {
  logo: require('../../assets/LogoPufziColor.png'),
  hero: require('../../assets/onboarding/onboarding.png'),
  location: require('../../assets/onboarding/salon.png'),
  salon: require('../../assets/onboarding/location.png'),
  time: require('../../assets/onboarding/time.png'),
}

export const COPY = {
  grooming: 'Grooming complet',
  preparing: 'Max se pregătește...',
  groomingTitle: 'Îl facem frumos.',
  salon: 'Paw Studio · 1,2 km',
  service: 'Grooming complet · Pentru Max',
  today: 'Astăzi',
  chooseTime: 'ALEGE ORA',
  bookingTitle: 'Alege ora potrivită.',
  confirmed: 'Programare confirmată',
  appointment: 'Astăzi · 14:30',
  confirmedTitle: 'Gata. Chiar așa simplu.',
  title: 'Programarea lui.\nMult mai simplă.',
  description: 'Descoperă saloane, alege serviciul potrivit și\nprogramează-l în câteva momente.',
  start: 'Începe',
}

export const SERVICES = ['Baie', 'Tuns', 'Periere'] as const

export const HOURS = ['10:00', '14:30'] as const

export const STEPS = [
  {
    label: 'Animal',
    icon: 'paw-outline',
    activeAt: 0,
  },
  {
    label: 'Servicii',
    icon: 'content-cut',
    activeAt: 500,
  },
  {
    label: 'Programare',
    icon: 'calendar-blank-outline',
    activeAt: 2200,
  },
  {
    label: 'Confirmat',
    icon: 'check',
    activeAt: 4500,
  },
] as const

export const FEATURES = [
  {
    label: 'Saloane\naproape',
    image: ASSETS.salon,
  },
  {
    label: 'Servicii\nclare',
    image: ASSETS.location,
  },
  {
    label: 'Ora ta\nliberă',
    image: ASSETS.time,
  },
] as const

export const DESIGN_WIDTH = 374
export const DESIGN_HEIGHT = 806
export const DURATION = 7800

export const CONFIRMATION_BACKGROUND = {
  light: '#D4E8D4',
  dark: '#1A3020',
} as const
