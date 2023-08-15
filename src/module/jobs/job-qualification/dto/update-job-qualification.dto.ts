import { CreatejobQualificationDto } from './create-job-qualification.dto';

export interface UpdatejobQualificationDto
  extends Partial<CreatejobQualificationDto> {
  id: number;
}
