import { useState } from 'react'
import { View, type LayoutChangeEvent } from 'react-native'
import { useTheme } from 'react-native-paper'

import { OnboardingSlide } from '../components/OnboardingSlide'
import { useOnboardingAnimation } from '../hooks/useOnboardingAnimation'
import { DESIGN_HEIGHT, DESIGN_WIDTH } from '../onboarding.constants'
import { styles } from '../onboarding.styles'

type Props = {
  onFinished: () => void
  fontFamily?: string
}

export const OnboardingScreen = ({ onFinished, fontFamily }: Props) => {
  const theme = useTheme()
  const { colors } = theme

  const { timeline, finished, setGroomingLoaded, setBookingLoaded } = useOnboardingAnimation()

  const [layout, setLayout] = useState({
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
  })

  const scale = layout.width / DESIGN_WIDTH

  const regularText = {
    color: colors.onSurfaceVariant,
    fontFamily: fontFamily ?? theme.fonts.bodyMedium.fontFamily,
  }

  const strongText = {
    color: colors.onSurface,
    fontFamily: fontFamily ?? theme.fonts.titleLarge.fontFamily,
  }

  const cardAppearance = {
    backgroundColor: colors.surface,
    borderColor: colors.outlineVariant,
    shadowColor: colors.onBackground,
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout

    if (width <= 0 || height <= 0) {
      return
    }

    setLayout(current =>
      current.width === width && current.height === height
        ? current
        : {
            width,
            height,
          },
    )
  }

  return (
    <View
      onLayout={handleLayout}
      style={[
        styles.root,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      <OnboardingSlide
        timeline={timeline}
        theme={theme}
        scale={scale}
        finished={finished}
        regularText={regularText}
        strongText={strongText}
        cardAppearance={cardAppearance}
        onStart={onFinished}
        onGroomingLoaded={() => setGroomingLoaded(true)}
        onBookingLoaded={() => setBookingLoaded(true)}
      />
    </View>
  )
}
