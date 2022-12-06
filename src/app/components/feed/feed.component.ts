import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: Post[] = [];

  constructor(private supabaseService: SupabaseService) {

  }

  async ngOnInit(): Promise<void> {
    // let {posts, error } = await this.supabaseService.getPosts()
    //   if(!error) {
    //     this.posts = posts ?? []
    //   }

    this.posts = await this.supabaseService.getPosts()
  }

}
