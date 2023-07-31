import { CreatelearningMaterialDto } from './create-learning-material.dto';

export interface UpdatelearningMaterialDto
  extends Partial<CreatelearningMaterialDto> {
  id: number;
}
