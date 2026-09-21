import { Animated, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { OnboardingBookingCard } from './OnboardingBookingCard'
import { OnboardingCard } from './OnboardingCard'
import { OnboardingIntroContent } from './OnboardingIntroContent'
import { OnboardingLogo } from './OnboardingLogo'
import { useOnboardingAnimation } from '../hooks/useOnboardingAnimation'

export const OnboardingSlide = () => {
  const { t } = useTranslation('Onboarding')
  const animation = useOnboardingAnimation()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          height: 390,
          justifyContent: 'center',
        }}
      >
        <OnboardingLogo
          opacity={animation.logo.opacity}
          scale={animation.logo.scale}
          translateY={animation.logo.translateY}
        />

        <View
          style={{
            height: 205,
            position: 'relative',
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '72%',
              opacity: animation.pet.opacity,
              transform: [{ translateX: animation.pet.translateX }, { rotate: '-4deg' }],
            }}
          >
            <OnboardingCard
              icon="paw"
              iconSize={25}
              title={t('intro.petName')}
              description={t('intro.petDescription')}
            />
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              top: 66,
              right: 0,
              width: '76%',
              opacity: animation.salon.opacity,
              transform: [{ translateX: animation.salon.translateX }, { rotate: '4deg' }],
            }}
          >
            <OnboardingCard
              icon="content-cut"
              iconSize={23}
              title={t('intro.service')}
              description={t('intro.salon')}
            />
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              top: 132,
              left: 18,
              right: 18,
              opacity: animation.booking.opacity,
              transform: [
                { translateY: animation.booking.translateY },
                { scale: animation.booking.scale },
              ],
            }}
          >
            <OnboardingBookingCard
              title={t('intro.confirmed')}
              description={t('intro.date')}
              checkScale={animation.booking.checkScale}
            />
          </Animated.View>
        </View>
      </View>

      <Animated.View
        style={{
          opacity: animation.content.opacity,
          transform: [{ translateY: animation.content.translateY }],
          marginTop: 10,
        }}
      >
        <OnboardingIntroContent title={t('intro.title')} description={t('intro.description')} />
      </Animated.View>
    </View>
  )
}
