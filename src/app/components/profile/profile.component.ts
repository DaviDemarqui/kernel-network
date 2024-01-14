import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { Profile } from 'src/app/models/Profile';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  profileId: string;
  userPosts: any[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.getUserPosts();
  }

  async getProfile() {
    this.route.params.subscribe(params => {
      this.profileId = params['id'];
    });

    if(this.profileId) {
      this.profile = await this.supabaseService.getCompleteProfileNonEdit(this.profileId);
    } else {
      this.profile = await this.supabaseService.getCompleteProfile();
    }
  }

  async getUserPosts() {
    if(this.profileId) {
      this.userPosts = await this.supabaseService.getUserPostsVisit(this.profileId);
    } else {
      this.userPosts = await this.supabaseService.getUserPostEdit();
    }
  }

}
