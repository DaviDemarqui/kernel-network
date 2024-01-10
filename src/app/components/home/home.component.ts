import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postCreationOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openPostCreation() {
    this.postCreationOpen ? this.postCreationOpen = false : this.postCreationOpen = true;
  }

}
