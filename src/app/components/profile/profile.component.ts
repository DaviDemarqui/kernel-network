import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Followers } from 'src/app/models/Followes';
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
  loggedUserId: any;
  userPosts: any[] = [];
  editing: boolean = false;

  following: boolean;
  followersCount: any;
  followingCount: any;

  constructor(
    private supabaseService: SupabaseService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.getLoggedUser();
    await this.getProfile();
    await this.checkEdit();
    await this.getUserPosts();
    await this.refresher();
  }

  async checkEdit() {
    if(this.loggedUserId == this.profileId) {
      this.editing = true;
    }
  }

  async getLoggedUser() {
    await this.supabaseService.getUserId().then(resolvedValue => {
      this.loggedUserId = resolvedValue;
    }).catch(error => {
      console.error("Error:", error);
    });
  }

  async follow() {
    this.supabaseService.follow(new Followers(this.loggedUserId, this.profileId))
    this.followersCount ++;
    this.following = true;
  }

  async unfollow() {
    this.supabaseService.unfollow(this.loggedUserId, this.profileId)
    this.followersCount --;
    this.following = false;
  }

  async checkFollowing() {
    this.following = await this.supabaseService.getFollowerForCheck(this.loggedUserId, this.profileId);
  }

  async countFollowers() {
    this.followersCount = await this.supabaseService.countFollowers(this.profileId);
    this.followingCount = await this.supabaseService.countFollowing(this.profileId);
    console.log(this.followersCount);
  }

  async refresher() {
    await this.countFollowers();
    await this.checkFollowing();
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
      this.userPosts = (await this.supabaseService.getUserPostsVisit(this.profileId)).reverse();
    } else {
      this.userPosts = await this.supabaseService.getUserPostEdit();
    }
  }

}
