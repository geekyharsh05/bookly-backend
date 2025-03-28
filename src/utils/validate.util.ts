import { ZodSchema, ZodError } from 'zod';
import { ApiError } from './apierror.util';

export const validateSchema = <T>(schema: ZodSchema, data: unknown): T => {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.errors.map(error => ({
      field: error.path.join('.'),
      message: error.message
    }));
    
    throw new ApiError(400, 'Validation failed', errors);
  }
  
  return result.data;
};