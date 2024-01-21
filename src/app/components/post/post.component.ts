import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from 'src/app/models/Like';
import { Post } from 'src/app/models/Post';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post') post: Post;

  postLikes: any[] = [];
  userHasLiked: boolean = false;
  userId: any;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.userId = await this.supabaseService.getUserId();
    await this.getLikesForPost();
  }

  openPostViewer() {
    this.router.navigate(['/view', this.post.post_id]);
  }

  async likePost() {
    const like = new Like;
    like.post_id = this.post.post_id;
    like.user_id = await this.supabaseService.getUserId();
    await this.supabaseService.likePost(like);
    this.getLikesForPost();
    this.checkLike();
  }

  async unlikePost() {
    const like = this.postLikes.find(like => like.user_id == this.userId);
    await this.supabaseService.unlikePost(like.id);
    await this.getLikesForPost();
    this.checkLike();
  }
  
  checkLike() {
    return this.postLikes.some(like => like.user_id == this.userId);
  }
  
  async getLikesForPost() {
    this.postLikes = await this.supabaseService.getLikesForPost(this.post.post_id);
  }

}
