import { Request, Response } from 'express';
import { BlogsService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService = new BlogsService(),
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const blogs = await this.blogsService.getAll(page, limit);
      return res.json(blogs);
    } catch (error) {
      console.error('Error in BlogsController.getAll:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    const createBlogDto: CreateBlogDto = req.body;

    try {
      const result = await this.blogsService.create(createBlogDto);
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error in BlogsController.create:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      const blogSlug = req.params.slug;
      const blog = await this.blogsService.show(blogSlug);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      return res.json(blog);
    } catch (error) {
      console.error('Error in BlogsController.show:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    const blogSlug = req.params.slug;
    const updateBlogDto: UpdateBlogDto = req.body;

    try {
      const blog = await this.blogsService.show(blogSlug);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      await this.blogsService.update(blogSlug, updateBlogDto);
      return res.json({ message: 'Blog updated successfully' });
    } catch (error) {
      console.error('Error in BlogsController.update:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const blogSlug = req.params.slug;

    try {
      const blog = await this.blogsService.show(blogSlug);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      await this.blogsService.delete(blogSlug);
      return res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error('Error in BlogsController.delete:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  blogsDraft = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const blogs = await this.blogsService.blogsDraft(page, limit);
      return res.json(blogs);
    } catch (error) {
      console.error('Error in BlogsController.blogsDraft:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
