import { z } from 'zod'

type ValidationMessages = {
  emailRequired: string
  invalidEmail: string
  passwordTooShort: string
}

export const loginSchema = (messages?: ValidationMessages) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, messages?.emailRequired)
      .refine(
        value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        messages?.invalidEmail ?? 'Invalid email address',
      ),
    password: z.string().min(8, messages?.passwordTooShort),
    rememberMe: z.boolean(),
  })

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>
