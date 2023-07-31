export interface CreateBlogDto {
  categoryId: number;
  title: string;
  slug: string;
  description: string;
  status: 'draft' | 'published';
}
