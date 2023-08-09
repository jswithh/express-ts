import { CreateFaqDto } from './create-faq.dto';

export interface UpdateFaqDto extends Partial<CreateFaqDto> {
  id: number;
}
