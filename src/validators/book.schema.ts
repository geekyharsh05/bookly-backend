import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .regex(/^[a-zA-Z0-9\s.,!?'"-]+$/, 'Title can only contain letters, numbers, spaces, and punctuation'),

  caption: z.string()
    .min(3, 'Caption must be at least 3 characters')
    .max(300, 'Caption cannot exceed 300 characters'),

  rating: z.number({
      required_error: 'Rating is required',
      invalid_type_error: 'Rating must be a number',
    })
    .min(0, 'Rating cannot be less than 0')
    .max(5, 'Rating cannot exceed 5'),

  image: z.string().optional()
});

export type BookInput = z.infer<typeof bookSchema>;
