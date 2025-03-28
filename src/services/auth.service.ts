import { User, UserDocument } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { RegisterInput, LoginInput, registerSchema, loginSchema } from '../validators/user.schema';
import { validateSchema } from '../utils/validate';
import { ApiError } from '../utils/ApiError';
import { AuthResponse, UserResponse } from '../types/response.types';

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
      throw new Error(
        existingUser.email === validatedData.email 
          ? 'Email already exists' 
          : 'Username already exists'
      );
    }

    const user = await User.create(validatedData);

    const token = this.generateToken(user._id.toString());

    return {
      token,
      user: this.formatUserResponse(user)
    };
  }

  public async loginUser(input: LoginInput): Promise<AuthResponse> {
    const validatedData: LoginInput = validateSchema(loginSchema, input);

    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      throw new ApiError(400, 'Email does not exist');
    }

    const isValidPassword = await user.isPasswordCorrect(validatedData.password);
    if (!isValidPassword) {
      throw new ApiError(400, 'Incorrect Credentials');
    }

    const token = this.generateToken(user._id.toString());

    return {
      token,
      user: this.formatUserResponse(user)
    };
  }

  private generateToken(userId: string): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  }

  private formatUserResponse(user: UserDocument): UserResponse {
    return {
      email: user.email,
      username: user.username,
      profileImage: user.profileImage || ""
    };
  }
}
