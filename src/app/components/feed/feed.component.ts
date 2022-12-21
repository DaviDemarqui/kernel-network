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
  semLike:any;


  async ngOnInit(): Promise<void> {

    const user = await this.supabaseService.getProfile();
    const userId = user.id
    // console.log(userId)
    this.posts = await this.supabaseService.getPosts();
    var semLike = []
    for(let i = 0; i < this.posts.length; i++){
      if(this.posts[i].likers.includes(userId)){
        semLike.push(false)
      } else {
        semLike.push(true)
      }
    }
    this.semLike = semLike.reverse()
    console.log(this.semLike)
    console.log(this.posts)
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
