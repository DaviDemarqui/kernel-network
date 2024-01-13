import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { SupabaseService } from 'src/app/supabase.service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: Post[] = [];
  postViewerOpen = false;
  
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
    ) {}

  async ngOnInit(): Promise<void> {
    this.getPosts();
  }

  openPostViewer(post: Post) {
      this.router.navigate(['/view', post.post_id]);
  }
  
  async getPosts() {
    this.posts = await this.supabaseService.getPosts();
  }
}
