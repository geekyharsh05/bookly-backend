import { User } from '../models/user.model';
import { RegisterInput, LoginInput, registerSchema, loginSchema } from '../validators/user.schema';
import { validateSchema } from '../utils/validate.util';
import { ApiError } from '../utils/apierror.util';
import { AuthResponse } from '../types/response.types';
import { generateToken } from '../utils/token.util';
import { formatUserResponse } from '../utils/format.util';

export class AuthService {
  public async registerUser(input: RegisterInput): Promise<AuthResponse> {
    const validatedData: RegisterInput = validateSchema(registerSchema, input);
    
    const existingUser = await User.findOne({ 
      $or: [
        { email: validatedData.email },
        { username: validatedData.username }
      ]
    });
    
    if (existingUser) {
      throw new ApiError(
        400,
        existingUser.email === validatedData.email 
          ? 'Email already exists' 
          : 'Username already exists'
      );
    }

    const user = await User.create(validatedData);
    const token = generateToken(user._id.toString());

    return {
      token,
      user: formatUserResponse(user)
    };
  }

  public async loginUser(input: LoginInput): Promise<AuthResponse> {
    const validatedData: LoginInput = validateSchema(loginSchema, input);

    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      throw new ApiError(400, 'User does not exist');
    }

    const isValidPassword = await user.isPasswordCorrect(validatedData.password);
    if (!isValidPassword) {
      throw new ApiError(400, 'Incorrect Credentials');
    }

    const token = generateToken(user._id.toString());

    return {
      token,
      user: formatUserResponse(user)
    };
  }
}
