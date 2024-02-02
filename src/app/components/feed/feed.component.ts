import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { SupabaseService } from 'src/app/supabase.service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: Post[] = [];
  
  constructor(
    private supabaseService: SupabaseService,
    ) {}

  async ngOnInit(): Promise<void> {
    this.getPosts();
  }
  
  async getPosts() {
    this.posts = (await this.supabaseService.getPosts()).reverse();
  }

  trackByPost(index: number, post: Post): number {
    return post.post_id;
  }
}
