import { AuthService } from './auth.service';
export class AuthController {
    authService;
    constructor(authService = new AuthService()) {
        this.authService = authService;
    }
    login = async (req, res) => {
        const loginDto = req.body;
        try {
            const token = await this.authService.login(loginDto);
            return res.json({ message: 'Login successful', token });
        }
        catch (error) {
            console.error('Error in AuthController.login:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=auth.controller.js.map