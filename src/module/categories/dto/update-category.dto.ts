import { CreateCategoryDto } from './create-category.dto';

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}
