import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MinProfile } from 'src/app/models/MinProfile';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;
  isDropdownOpen = false;
  profile: MinProfile;
  
  constructor(
    private readonly supabase: SupabaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Subscribe to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateComponentState();
      }
    });
    
    // Initial update
    this.updateComponentState();
  }

  updateComponentState() {
    this.isLogged();
    if (this.logged) {
      this.getProfile();
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  async getProfile() {
    this.profile = await this.supabase.getMinProfile();
  }

  isLogged() {
    if(this.supabase.isAuthenticated()) {
      this.logged = true;
      console.log(this.logged)
    }
  }

  async logOut() {
    try {
      await this.supabase.signOut();
      this.logged = false;
    } catch (error) {
      console.log(error)
    } finally {
      this.router.navigate(['']);
    }
  }

}
