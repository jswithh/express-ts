import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

export class AuthController {
  constructor(private readonly authService: AuthService = new AuthService()) {}

  login = async (req: Request, res: Response) => {
    const loginDto: LoginDto = req.body;

    try {
      const token = await this.authService.login(loginDto);
      return res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error in AuthController.login:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
