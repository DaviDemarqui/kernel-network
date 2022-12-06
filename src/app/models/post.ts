export interface Post{
  id: number;
  photo: string;
  description: string;
  likes: number;
  created_at: Date;
  user_id: number;
}
