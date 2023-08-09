import { CreateJobDto } from './create-job.dto';

export interface UpdateJobDto extends Partial<CreateJobDto> {
  id: number;
}
