export interface CreatePageDto {
  name: string;
  title: string;
  url: string;
  seoDescription: string;
  content: string;
  status: 'draft' | 'published';
}
