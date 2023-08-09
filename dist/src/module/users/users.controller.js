import { UsersService } from './users.service';
export class UsersController {
    usersService;
    constructor(usersService = new UsersService()) {
        this.usersService = usersService;
    }
    getAll = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const users = await this.usersService.getAll(page, limit);
            return res.json(users);
        }
        catch (error) {
            console.error('Error in UsersController.getAll:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    create = async (req, res) => {
        const createUserDto = req.body;
        try {
            const result = await this.usersService.create(createUserDto);
            return res.status(201).json({ message: result });
        }
        catch (error) {
            console.error('Error in UsersController.create:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    show = async (req, res) => {
        try {
            const userId = Number(req.params.id);
            const user = await this.usersService.show(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json(user);
        }
        catch (error) {
            console.error('Error in UsersController.show:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    update = async (req, res) => {
        const userId = Number(req.params.id);
        const updateUserDto = req.body;
        try {
            await this.usersService.update(userId, updateUserDto);
            return res.json({ message: 'User updated successfully' });
        }
        catch (error) {
            console.error('Error in UsersController.update:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    delete = async (req, res) => {
        const userId = Number(req.params.id);
        try {
            await this.usersService.delete(userId);
            return res.json({ message: 'User deleted successfully' });
        }
        catch (error) {
            console.error('Error in UsersController.delete:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}
//# sourceMappingURL=users.controller.js.map