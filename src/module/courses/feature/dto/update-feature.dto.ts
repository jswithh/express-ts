import { CreateFeatureDto } from './create-feature.dto';

export interface UpdateFeatureDto extends Partial<CreateFeatureDto> {
  id: number;
}
