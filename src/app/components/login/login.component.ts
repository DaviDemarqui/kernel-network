import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { SupabaseService } from '../../supabase.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;

  signInForm = this.formBuilder.group({
    email: '',
    password: ''
  })

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string
      await this.supabase.signInWithEmail(email, password)
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
