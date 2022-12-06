import { Injectable } from "@angular/core";
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

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }

  async getPosts() {
    const posts = await this.supabase.from('post').select()
    return posts.data || []
  }
}
