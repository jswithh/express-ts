export interface CreatebusinessLineDto {
  name: string;
  slug: string;
  images: string;
  content: string;
  status: 'draft' | 'published';
}
