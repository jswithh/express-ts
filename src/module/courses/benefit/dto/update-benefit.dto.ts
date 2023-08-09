import { CreateBenefitDto } from './create-benefit.dto';

export interface UpdateBenefitDto extends Partial<CreateBenefitDto> {
  id: number;
}
