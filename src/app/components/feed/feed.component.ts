import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  likeValue: number = 0;
  liker: Post;
  likeClickCount: number;
  
  constructor(
    private supabaseService: SupabaseService,
    // public sanitizer: DomSanitizer
    ) {

  }

  async ngOnInit(): Promise<void> {
    this.posts = await this.supabaseService.getPosts()
  }
  


  async likeAction(postId: string, likers: any) {
    // like++;
    likers = await this.supabaseService.getProfile();
    await this.supabaseService.getPostById(postId);

    await this.supabaseService.putPostForLike(postId, likers);
    // this.likeClickCount = like;
  }


  // FUNÇÃO PARA EVITAR ERROS AO ADD VIDEOS
  //---------------------------------------
  // secureImage(link: string) {
  //   const safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);

  //   return safeLink;
  // }

}
