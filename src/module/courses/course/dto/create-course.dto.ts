export interface CreateCourseDto {
  categoryId: number;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  competency_unit: string;
  price: number;
  discount?: number;
  discountPrice?: number;
  thumbnail: string;
  heroImg: string;
  status: 'draft' | 'published';
}
