import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from "src/environments/environment";
import { Post } from "./models/post";
// import { Database } from 'src/schema';
// Dps ver o porque da linha acima???

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient
  _session: AuthSession | null = null

  constructor(
    private router: Router,
  ) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  saveToken(token: any) {
    if (token) {
      localStorage.setItem('access_token', JSON.stringify(token));
    }
  }

  public isAuthenticated(): boolean {
    let token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  getToken() {
    const tokenString = localStorage.getItem('sb-kjulugmdepadnaoksrus-auth-token');
    if (tokenString) {
      return tokenString;
    }
    return null;
  }

  // Metodo antigo de login horrivel usando link por email 🤮
  // signIn(email: string) {
  //   return this.supabase.auth.signInWithOtp({ email })
  // }

  async signInWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })
    if(error){ throw error}
    else {
      this.router.navigate(['/login']);
    }
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    if(error){ throw error}
  }

  async register(email: string, password: string) {
    try {
      await this.supabase.auth.signUp({ email, password});
    } catch (error) {
      console.log(error)
    } finally {
      console.log("User registrated with suceess")
    }
  }

  async getPosts() {
    const posts = await this.supabase.from('post').select()
    return posts.data || []
  }



}
