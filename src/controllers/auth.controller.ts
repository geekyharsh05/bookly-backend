import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, name } = req.body;
      const result = await this.authService.registerUser(email, password, name);
      
      return res.status(201).json({
        message: 'User created successfully',
        ...result
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'User already exists') {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const result = await this.authService.loginUser(email, password);

      return res.status(200).json({
        message: 'Login successful',
        ...result
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}