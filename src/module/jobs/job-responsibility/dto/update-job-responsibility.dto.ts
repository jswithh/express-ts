import { CreatejobResponsibilityDto } from './create-job-responsibility.dto';

export interface UpdatejobResponsibilityDto
  extends Partial<CreatejobResponsibilityDto> {
  id: number;
}
