import { CreateSeoDto } from './create-seo.dto';

export interface UpdateSeoDto extends Partial<CreateSeoDto> {
  id: number;
}
