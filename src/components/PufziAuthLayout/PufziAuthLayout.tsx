import { useEffect, useRef, type ReactNode } from 'react'
import { Animated, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { AppControls } from '../AppControls/AppControls'
import { PufziAuthBackground } from '../PufziAuthBackground/PufziAuthBackground'

type Props = {
  children: ReactNode
}

export const PufziAuthLayout = ({ children }: Props) => {
  const theme = useTheme()
  const contentAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animation = Animated.timing(contentAnim, {
      toValue: 1,
      duration: 500,
      delay: 180,
      useNativeDriver: true,
    })

    animation.start()

    return () => animation.stop()
  }, [contentAnim])

  const contentTranslateY = contentAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [22, 0],
  })

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <PufziAuthBackground />

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 52,
            paddingBottom: 32,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              alignItems: 'flex-end',
              marginBottom: 12,
            }}
          >
            <AppControls />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 20,
            }}
          >
            <Animated.View
              style={{
                opacity: contentAnim,
                transform: [{ translateY: contentTranslateY }],
              }}
            >
              {children}
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
