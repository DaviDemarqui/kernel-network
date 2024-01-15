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
import { Post } from "./models/Post";
import { Comment } from "./models/Comment";
import { Storie } from "./models/Storie";
import { Profile } from "./models/Profile";
// import { Database } from 'src/schema';
// Dps ver o porque da linha acima???

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  private supabase: SupabaseClient
  _session: AuthSession | null = null

  jwtHelper: JwtHelperService = new JwtHelperService();

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
    const tokenString = localStorage.getItem('sb-iaqpwtoliaqcilistlau-auth-token');
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
    const { error } = await this.supabase.auth.signOut();
    localStorage.removeItem('sb-iaqpwtoliaqcilistlau-auth-token')
    if(error){ console.log(error)}
    else{
      this.router.navigate(['']);
    }
  }

  async register(email: string, password: string) {
    try {
      await this.supabase.auth.signUp({ 
        email, password, 
      });
    } catch (error) {
      console.log(error)
    } finally {
      console.log("User registrated with suceess")
    }
  }

  async getPosts() {
    const posts = await this.supabase.from('feed_posts_view').select().order('created_at');
    return posts.data || []
  }

  async getComments(postId: number) {
    const comments = await this.supabase.from('post_comments_view').select().eq('post_id', postId);
    return comments.data || []
  }

  async newComment(comment: Comment) {
    await this.supabase.from('comments').insert(comment);
  }

  async getProfile() {
    const userId = await this.getUserId();
    const profile = await this.supabase.from('profiles').select().eq('id', userId).single();
    // console.log(JSON.stringify(profile.data));
    return profile.data;
  }

  async getMinProfile() {
    const userId = await this.getUserId();
    const minProfile = await this.supabase.from('min_profile').select().eq('id', userId).single();
    return minProfile.data;
  }

  async getCompleteProfile() {
    const userId = await this.getUserId();
    const profile = await this.supabase.from('profiles').select().eq('id', userId).single();
    return profile.data;
  }

  // this request will used when a non editable profile is visited;
  async getCompleteProfileNonEdit(profileId: string) {
    const profile = await this.supabase.from('profiles').select().eq('id', profileId).single();
    return profile.data;
  }

  async newPost(post: Post) {
    await this.supabase.from('posts').insert(post)
  }

  async getPostById(postId: number) {
    let post = await this.supabase.from('feed_posts_view').select().eq('post_id', postId).single();
    console.log(post.data)
    return post.data || null;
  }

  async getUserPostsVisit(id: string): Promise<any[]> {
    let posts = await this.supabase.from('feed_posts_view').select('*').eq('created_by', id);
    return posts.data || [];
  }
  
  async getUserPostEdit(): Promise<any[]> {
    let userId = this.getUserId();
    let posts = await this.supabase.from('feed_posts_view').select('*').eq('created_by', userId);
    return posts.data || [];
  }

  async getStories(): Promise<any[]> {
    let stories = await this.supabase.from('min_stories_view').select().limit(50);
    return stories.data || [];
  }

  // Only functions that use buckets ahead;

  async uploadPost(form: FormGroup, selectedFile: File) {
    let post = new Post();
    const { data, error } = await this.supabase.storage.from('post_image').upload(selectedFile.name, selectedFile);
    if (error) {
      console.error(error);
    } else {
      try {
        const { data } = await this.supabase.storage.from('post_image').getPublicUrl(selectedFile.name);
        console.log(data);
        post.photo = data.publicUrl;
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
      post.description = form.get('description')?.value;
      post.feel = form.get('feel')?.value;
      console.log(post);
      await this.newPost(post);
    }
  }

  async uploadStories(selectedFile: File) {
    const storie = new Storie();
    const { data, error } = await this.supabase.storage.from('stories_image').upload(selectedFile.name, selectedFile);
    if (error) {
      console.error(error);
    } else {
      try {
        const { data } = await this.supabase.storage.from('stories_image').getPublicUrl(selectedFile.name);
        console.log('finded data: ',data);
        storie.photo = data.publicUrl;
        storie.archived = false;
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }
    await this.supabase.from('stories').insert(storie);
  }

  async submitProfile(profile: Profile, selectedFile: File) {
    console.log(profile);
    console.log(selectedFile)
    const { error } = await this.supabase.storage.from('avatars').upload(selectedFile.name, selectedFile);
    if (error) {
      console.error(error);
    } else {
      try {
        const { data } = await this.supabase.storage.from('avatars').getPublicUrl(selectedFile.name);
        profile.avatar_url = data.publicUrl;
        console.log('finded data: ',data);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }
    await this.supabase.from('profiles').update(profile).eq('id', profile.id);
  }
}
