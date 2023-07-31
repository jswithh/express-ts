import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export class UsersController {
  constructor(
    private readonly usersService: UsersService = new UsersService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const users = await this.usersService.getAll(page, limit);
      return res.json(users);
    } catch (error) {
      console.error('Error in UsersController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const createUserDto: CreateUserDto = req.body;
    try {
      const result = await this.usersService.create(createUserDto);
      return res.status(201).json({ message: result });
    } catch (error) {
      console.error('Error in UsersController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const user = await this.usersService.show(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      console.error('Error in UsersController.show:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const updateUserDto: UpdateUserDto = req.body;

    try {
      await this.usersService.update(userId, updateUserDto);
      return res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error in UsersController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    try {
      await this.usersService.delete(userId);
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error in UsersController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
