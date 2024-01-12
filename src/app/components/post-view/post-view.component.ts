import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/post';
import { PostCommentView } from 'src/app/models/post_comment_view';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  @Input('post') post: Post;
  comment: Comment;
  comments: any[] = [];
  formComment: FormGroup;
  loading: boolean = false;

  constructor(
    private supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
  ) { }

  async ngOnInit() {
    console.log(this.post)
    this.criandoForm();
    this.comments = await this.supabase.getComments(this.post.post_id);
    console.log(this.comments)
  }

  async commentList() {
    this.comments = await this.supabase.getComments(this.post.post_id);
  }
  
  criandoForm() {
    this.formComment = this.formBuilder.group({
      text: [this.comment?.text],
      post_id: [this.comment?.post_id],
      user_id: [this.comment?.user_id],
    })
  }


  async submitComment() {
    try {
      this.loading = true
      this.comment = this.formComment.value;
      console.log(this.comment)
      await this.supabase.newComment(this.comment)
    } catch (error) {
      alert(error)
    } finally {
      this.loading = false;
    }
  }

}
