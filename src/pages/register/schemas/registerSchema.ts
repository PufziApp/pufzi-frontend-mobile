import { z } from 'zod'

export const getPasswordChecks = (password: string) => ({
  minLength: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[^a-zA-Z0-9\s]/.test(password),
})

export const registerSchema = () =>
  z
    .object({
      firstName: z.string().trim().min(1, 'validation.firstNameRequired'),

      lastName: z.string().trim().min(1, 'validation.lastNameRequired'),

      email: z
        .string()
        .trim()
        .min(1, 'validation.emailRequired')
        .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
          message: 'validation.emailInvalid',
        }),

      password: z.string().refine(value => Object.values(getPasswordChecks(value)).every(Boolean), {
        message: 'validation.passwordRequirements',
      }),

      confirmPassword: z.string().min(1, 'validation.confirmPasswordRequired'),

      acceptedTerms: z.boolean().refine(value => value, {
        message: 'validation.termsRequired',
      }),
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'validation.passwordsDoNotMatch',
    })

export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>
