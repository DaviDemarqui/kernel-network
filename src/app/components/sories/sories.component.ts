import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-sories',
  templateUrl: './sories.component.html',
  styleUrls: ['./sories.component.css']
})
export class SoriesComponent implements OnInit {

  constructor(
    private supabaseService: SupabaseService
  ) { }

  ngOnInit(): void {
  }

  storie = {
    file: null,
    user_id: 'your_user_id', // replace with the actual user ID
    viewers: []
  };

  onFileChange(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.storie.file = file;
    }

    this.submitStorie()
  }

  // You can call this function when you want to submit the storie object
  submitStorie() {
    console.log(this.storie);
    // Add your logic to send the storie object to the server or perform other actions
  }

}
