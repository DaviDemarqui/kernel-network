import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  profile: Profile;
  selectedPhoto: File;
  loading = false;
  formProfile: FormGroup;
  userId: any;

  constructor(
    private router: Router,
    private readonly formBuilder: FormBuilder,
    private supabaseService: SupabaseService
  ) { }

  ngOnInit(): void {
    this.supabaseService.getUserId().then(resolvedValue => {
      console.log("Resolved Value:", resolvedValue);
      this.userId = resolvedValue;
    }).catch(error => {
      console.error("Error:", error);
    });
    this.createForm();
  }

  createForm() {
    this.formProfile = this.formBuilder.group({
      username: [this.profile?.username],
      avatar_url: [''],
      full_name: [this.profile?.full_name],
      bio: [this.profile?.bio],
    })
  }

  onFileChange(event: any) {
    this.selectedPhoto = event.target.files[0];
    if (this.selectedPhoto) {
      const reader = new FileReader();
      console.log(this.selectedPhoto);
      reader.readAsDataURL(this.selectedPhoto); // You can use other methods based on your requirements
    }
  }
  
  async onSubmit() {
    this.profile = this.formProfile.value;
    this.profile.id = this.userId;
    console.log(this.profile)
    try {
      this.loading = true;
      await this.supabaseService.submitProfile(this.profile, this.selectedPhoto);
    } catch (error) {
      alert(error);
    } finally {
      this.router.navigate(['/home']);
      this.loading = false;
    }
  }

}
