import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/Comment';
import { Post } from 'src/app/models/Post';
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
  postId: number;

  constructor(
    private supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.criandoForm();

    this.route.params.subscribe(params => {
      this.postId = params['id'];
    });
    this.post = await this.supabase.getPostById(this.postId);
    console.log(this.post)
    await this.commentList()
    console.log(this.comments)
    this.criandoForm();
  }

  async commentList() {
    this.comments = (await this.supabase.getComments(this.post.post_id)).reverse();
  }
  
  criandoForm() {
    this.formComment = this.formBuilder.group({
      text: [this.comment?.text],
      post_id: [this.postId],
      user_id: [this.comment?.user_id],
    })
  }


  async submitComment() {
    try {
      this.loading = true
      this.comment = this.formComment.value;
      await this.supabase.getUserId().then(resolvedValue => {
        this.comment.user_id = resolvedValue;
      }).catch(error => {
        console.error("Error:", error);
      });
      await this.supabase.newComment(this.comment)
      console.log(this.comment)
    } catch (error) {
      alert(error)
    } finally {
      await this.commentList();
      this.loading = false;
    }
  }

}
