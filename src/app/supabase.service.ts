import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
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

  jwtHelper: JwtHelperService = new JwtHelperService();
  idUsuario: string;


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


  async getUserId() {
    const data = (await this.supabase.auth.getUser()).data.user?.id;
    if(data != null) {
      return data
    } else {
      return console.error("Valor do usuario está null")
    }
  }

  async signInWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })
    if(error){ throw error}
    else {
      this.router.navigate(['/home']);
    }
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    if(error){ console.log(error)}
    else{
      this.router.navigate(['']);
    }
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
    const posts = await this.supabase.from('post').select().order('created_at')
    return posts.data || []
  }

  

  async getProfile() {
    const userId = await this.getUserId();
    const profile = await this.supabase.from('profiles').select().eq('id', userId).single();
    // console.log(JSON.stringify(profile.data));
    return profile.data;
  }

  async newPost(post: Post) {
    await this.supabase.from('post').insert(post)
  }

  async getPostById(postId: string) {
    await this.supabase.from('post').select().eq('id', postId).single()
  }

  async putPostForLike(postId: string, liker: any) {
    await this.getPostById(postId);
    var oldList = await this.supabase.from('post').select().eq('id', postId).single();
    var lista = oldList.data.likers
    lista.push(liker)

    await this.supabase.from('post').update({likers: lista}).eq('id', postId);
  }


}
