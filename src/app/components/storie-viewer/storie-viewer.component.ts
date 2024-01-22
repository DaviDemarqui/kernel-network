import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storie } from 'src/app/models/Storie';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-storie-viewer',
  templateUrl: './storie-viewer.component.html',
  styleUrls: ['./storie-viewer.component.css']
})
export class StorieViewerComponent implements OnInit {

  storie: any;
  storieId: number;

  constructor(
    private supabaseService: SupabaseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.storieId = params['id'];
    });
    this.findStorie();
  }
  
  async findStorie() {
    this.storie = await this.supabaseService.getStorieById(this.storieId);
  }
}
