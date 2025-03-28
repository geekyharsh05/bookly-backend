import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../utils/asynchandler.util';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public login = asyncHandler(async (req: Request) => {
    const result = await this.authService.loginUser(req.body);
    return {
      message: 'Login successful',
      ...result
    };
  });

  public register = asyncHandler(async (req: Request) => {
    const result = await this.authService.registerUser(req.body);
    return {
      message: 'User created successfully',
      ...result
    };
  });

  public getProfile = asyncHandler(async (req: Request) => {
    return {
      message: 'Profile retrieved successfully',
      user: req.user
    };
  });
}