import { z } from 'zod'

export const loginSchema = () =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1)
      .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Invalid email address'),
    password: z.string().min(8),
  })

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>
