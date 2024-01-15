import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInAuthGuard } from './guards/loggedInAuth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { StorieViewerComponent } from './components/storie-viewer/storie-viewer.component';

const routes: Routes = [
    {
      path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard]},
    {
      path:'create-account', component: CreateAccountComponent, canActivate: [LoggedInAuthGuard]},
    {
      path:'create-profile', component: CreateProfileComponent, canActivate: [LoggedInAuthGuard]},
    {
      path: '', component: HeroComponent},
    {
      path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {
      path: 'new', component: NewPostComponent, canActivate: [AuthGuard]},
    {
      path: 'view/:id', component: PostViewComponent, canActivate: [AuthGuard]},
    {
      path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
    {
      path: 'stories/:id', component: StorieViewerComponent, canActivate: [AuthGuard]},


];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
