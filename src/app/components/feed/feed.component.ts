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
  
  constructor(
    private supabaseService: SupabaseService,
    // public sanitizer: DomSanitizer
    ) {

  }

  async ngOnInit(): Promise<void> {
    this.posts = await this.supabaseService.getPosts()
  }
  


  async likeAction(postId: string, liker: any) {
    liker = await this.supabaseService.getProfile();
    var newliker = await Object.entries(liker)[0]
    await this.supabaseService.getPostById(postId);
    

    await this.supabaseService.putPostForLike(postId, newliker);
  }


  // FUNÇÃO PARA EVITAR ERROS AO ADD VIDEOS
  //---------------------------------------
  // secureImage(link: string) {
  //   const safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);

  //   return safeLink;
  // }

}
