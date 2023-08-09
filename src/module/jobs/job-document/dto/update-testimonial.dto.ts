import { CreateTestimonialDto } from './create-testimonial.dto';

export interface UpdateTestimonialDto extends Partial<CreateTestimonialDto> {
  id: number;
}
