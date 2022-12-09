import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostgrestBuilder } from '@supabase/postgrest-js';
import { Post } from 'src/app/models/post';
import { SupabaseService } from 'src/app/supabase.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {
  loading = false;
  post: Post;
  formPost: FormGroup;

  initialFoto = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_184eb4cbd90%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_184eb4cbd90%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2299.421875%22%20y%3D%2296.6%22%3EImage%20cap%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
  previewFoto = this.initialFoto
  initialLegenda = "Com certeza sairá alguma atrocidade proibida em 192 países"
  previewLegenda = this.initialLegenda

  constructor(
    private router: Router,
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.criandoForm()
  }



  onInput(event: any){
    if(event.target.value){
      this.previewFoto = event.target.value;
    } else {
      this.previewFoto = this.initialFoto;
    }
  }

  atualizaLegenda(event: any) {
    if(event.target.value){
      this.previewLegenda = event.target.value;
    } else {
      this.previewLegenda = this.initialLegenda;
    }
  }
  

  criandoForm() {
    this.formPost = this.formBuilder.group({
      photo: [this.post?.photo],
      description: [this.post?.description],
    })
  }

  async onSubmit() {
    try {
      this.loading = true;
      await this.supabase.newPost(this.formPost.value)
    } catch (error) {
      alert(error)
      console.log(error)
    } finally {
      this.router.navigate(['/home']);
      this.loading = false;
    }
  }
}
