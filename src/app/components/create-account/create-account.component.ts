import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  loading = false;

  signInForm = this.formBuilder.group({
    email: '',
    password: '',
    confirmPassword: ''
  })

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if(this.signInForm.value.confirmPassword == this.signInForm.value.password){
      try {
        this.loading = true
        const email = this.signInForm.value.email as string;
        const password = this.signInForm.value.password as string;
        await this.supabase.register(email, password)
      } catch (error) {
        if(error instanceof Error) {
          alert(error.message)
        }
      } finally {
        this.signInForm.reset()
        this.loading = false
      }
    }
  }

}
