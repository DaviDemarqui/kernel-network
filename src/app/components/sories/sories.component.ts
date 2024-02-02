import { Component, OnInit } from '@angular/core';
import { Storie } from 'src/app/models/Storie';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-sories',
  templateUrl: './sories.component.html',
  styleUrls: ['./sories.component.css']
})
export class SoriesComponent implements OnInit {

  storyGroups: { [username: string]: any[] } = {};
  stories: any[] = [];

  insertedPhoto: File;

  constructor(
    private supabaseService: SupabaseService
  ) { }

  ngOnInit(): void {
    this.getStories();
  }

  onFileChange(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      this.insertedPhoto = fileInput.files[0];
    }
    this.submitStorie(this.insertedPhoto);
  }

  async getStories() {
    console.log('RUNNING GETSTORIES()')
    this.stories = (await this.supabaseService.getStories()).reverse();
    this.groupStories(this.stories);
  }

  groupStories(stories: any[]) {
    this.storyGroups = {}
    stories.forEach(storie => {
      const username = storie.username;
      if (!this.storyGroups[username]) {
        this.storyGroups[username] = [];
      }
      this.storyGroups[username].push(storie);
    })
  }

  async submitStorie(selectedFile: File) {
    console.log('file:', selectedFile);
    try {
      this.supabaseService.uploadStories(selectedFile);
    } catch (error) {
      alert(error)
    } finally {
      await this.getStories();
    }
  }

}
