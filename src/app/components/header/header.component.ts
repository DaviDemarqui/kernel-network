import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly supabase: SupabaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async logOut() {
    try {
      await this.supabase.signOut()
    } catch (error) {
      console.log(error)
    } finally {
      this.router.navigate(['']);
    }
  }

}
