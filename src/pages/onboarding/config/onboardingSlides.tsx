import type { ImageSourcePropType } from 'react-native'

export type OnboardingSlide = {
  id: string
  titleKey: string
  descriptionKey: string
  image: ImageSourcePropType
}

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'welcome',
    titleKey: 'slides.welcome.title',
    descriptionKey: 'slides.welcome.description',
    image: require('../../../assets/onboarding/welcome.png'),
  },
  {
    id: 'grooming',
    titleKey: 'slides.grooming.title',
    descriptionKey: 'slides.grooming.description',
    image: require('../../../assets/onboarding/grooming.png'),
  },
  {
    id: 'transformation',
    titleKey: 'slides.transformation.title',
    descriptionKey: 'slides.transformation.description',
    image: require('../../../assets/onboarding/transformation.png'),
  },
  {
    id: 'booking',
    titleKey: 'slides.booking.title',
    descriptionKey: 'slides.booking.description',
    image: require('../../../assets/onboarding/booking.png'),
  },
]
