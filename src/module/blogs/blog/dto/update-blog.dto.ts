import { CreateBlogDto } from './create-blog.dto';

export interface UpdateBlogDto extends Partial<CreateBlogDto> {}
