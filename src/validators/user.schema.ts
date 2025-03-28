import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  
  profileImage: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  
  password: z.string()
    .min(1, 'Password is required')
    .max(100, 'Password is too long')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;