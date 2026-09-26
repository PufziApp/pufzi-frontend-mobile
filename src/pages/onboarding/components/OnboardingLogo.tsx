import { Animated, Image } from 'react-native'

type OnboardingLogoProps = {
  opacity: Animated.Value
  scale: Animated.Value
  translateY: Animated.Value
}

export const OnboardingLogo = ({ opacity, scale, translateY }: OnboardingLogoProps) => {
  return (
    <Animated.View
      style={{
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 24,
        opacity,
        transform: [{ translateY }, { scale }],
      }}
    >
      <Image
        source={require('../../../assets/LogoPufziColor.png')}
        resizeMode="contain"
        style={{
          width: 105,
          height: 105,
        }}
      />
    </Animated.View>
  )
}
