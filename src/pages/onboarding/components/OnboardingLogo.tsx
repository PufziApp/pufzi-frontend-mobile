import { Image, View } from 'react-native'

type Props = {
  size: number
  top: number
}

export const OnboardingLogo = ({ size, top }: Props) => {
  return (
    <View
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        zIndex: 20,
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../../assets/LogoPufziColor.png')}
        resizeMode="contain"
        style={{
          width: size,
          height: size,
        }}
      />
    </View>
  )
}
