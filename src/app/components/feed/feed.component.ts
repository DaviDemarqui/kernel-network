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

  public notLiked:boolean = true;


  async ngOnInit(): Promise<void> {

    const user = await this.supabaseService.getProfile();
    const userId = user.id
    console.log(userId)
    this.posts = await this.supabaseService.getPosts();
    for(let i = 0; i < this.posts.length; i++){
      console.log(this.posts[i].description);
      if(this.posts[i].likers.includes(userId)){
        this.notLiked = false;
      }
    }
  }
  


  async likeAction(postId: string, liker: any) {
    liker = await this.supabaseService.getProfile();
    var newliker = liker.id
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
