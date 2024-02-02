import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-follow-suggestion',
  templateUrl: './follow-suggestion.component.html',
  styleUrls: ['./follow-suggestion.component.css']
})
export class FollowSuggestionComponent implements OnInit {

  suggestionList: any[] = [];
  userProfile: any;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.getUserProfile();
    await this.getSuggestionData();
  }

  async getSuggestionData() {
    this.suggestionList = await this.supabaseService.getRandomMinProfile()
    console.log(this.suggestionList);
  }

  async getUserProfile() {
    this.userProfile = await this.supabaseService.getMinProfile();
    console.log("USUARIO", this.userProfile);
  }

  async logOut() {
    await this.supabaseService.signOut();
  }

}
