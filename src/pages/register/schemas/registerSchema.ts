import { z } from 'zod'

export const registerSchema = () => {
  return z
    .object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().min(1),
      email: z
        .string()
        .trim()
        .min(1)
        .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'passwordsDoNotMatch',
    })
}

export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>
