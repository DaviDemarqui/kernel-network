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

  semLike:any;
  userId:any;


  async ngOnInit(): Promise<void> {

    // const user = await this.supabaseService.getProfile();
    // this.userId = user.id
    this.likeList();
    // console.log(userId)
    
    
    // console.log(this.semLike)
    // console.log(this.posts)
  }
  
  async likeList() {
    var posts = await this.supabaseService.getPosts();
    console.log(posts)
    this.posts = posts
    var semLike = []
    for(let i = 0; i < posts.length; i++){
      if(posts[i].likers.includes(this.userId)){
        semLike.push(false)
      } else {
        semLike.push(true)
      }
    }
    this.semLike = semLike.reverse()
    console.log(this.semLike)
  }


  async likeAction(postId: string, liker: any) {
    liker = await this.supabaseService.getProfile();
    var newliker = liker.id
    await this.supabaseService.getPostById(postId);
    

    await this.supabaseService.putPostForLike(postId, newliker);
    this.likeList();
  }


  // FUNÇÃO PARA EVITAR ERROS AO ADD VIDEOS
  //---------------------------------------
  // secureImage(link: string) {
  //   const safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);

  //   return safeLink;
  // }

}
