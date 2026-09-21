import { useState } from 'react'
import { HelperText, TextInput, type TextInputProps } from 'react-native-paper'

type Props = TextInputProps & {
  errorMessage?: string
  isPassword?: boolean
}

export const PufziTextInput = ({
  errorMessage,
  isPassword = false,
  secureTextEntry,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <TextInput
        mode="outlined"
        {...props}
        secureTextEntry={isPassword ? !showPassword : secureTextEntry}
        right={
          isPassword ? (
            <TextInput.Icon
              icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setShowPassword(value => !value)}
            />
          ) : undefined
        }
        style={{ borderRadius: 14 }}
      />

      {errorMessage && (
        <HelperText type="error" visible>
          {errorMessage}
        </HelperText>
      )}
    </>
  )
}
