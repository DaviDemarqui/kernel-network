import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FeedComponent } from './components/feed/feed.component';
import { HomeComponent } from './components/home/home.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInAuthGuard } from './guards/loggedInAuth.guard';
import { TextareaAutoresizeDirective } from './textarea-autoresize.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    FeedComponent,
    HomeComponent,
    CreateAccountComponent,
    NewPostComponent,
    TextareaAutoresizeDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, LoggedInAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
