import { useState } from 'react'
import { HelperText, TextInput, useTheme, type TextInputProps } from 'react-native-paper'

type Props = TextInputProps & {
  errorMessage?: string
  isPassword?: boolean
  appearance?: 'default' | 'auth'
}

export const PufziTextInput = ({
  errorMessage,
  isPassword = false,
  secureTextEntry,
  appearance = 'default',
  style,
  outlineStyle,
  contentStyle,
  right,
  ...props
}: Props) => {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const isAuth = appearance === 'auth'

  return (
    <>
      <TextInput
        mode="outlined"
        {...props}
        error={props.error || Boolean(errorMessage)}
        secureTextEntry={isPassword ? !showPassword : secureTextEntry}
        outlineColor={isAuth ? theme.colors.outline : props.outlineColor}
        activeOutlineColor={props.activeOutlineColor ?? theme.colors.primary}
        textColor={props.textColor ?? theme.colors.onSurface}
        placeholderTextColor={props.placeholderTextColor ?? theme.colors.onSurfaceVariant}
        right={
          isPassword ? (
            <TextInput.Icon
              icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setShowPassword(value => !value)}
              color={theme.colors.onSurfaceVariant}
            />
          ) : (
            right
          )
        }
        outlineStyle={[{ borderRadius: isAuth ? 18 : 14 }, outlineStyle]}
        contentStyle={[isAuth && { fontSize: 16 }, contentStyle]}
        style={[
          { borderRadius: 14 },
          isAuth && { minHeight: 56, backgroundColor: theme.colors.background },
          style,
        ]}
      />

      {errorMessage && (
        <HelperText type="error" visible>
          {errorMessage}
        </HelperText>
      )}
    </>
  )
}
