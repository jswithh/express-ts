export interface CreateJobDto {
  title: string;
  slug: string;
  images: string;
  status: 'draft' | 'published';
}
