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

const routes: Routes = [
    {
      path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard]},
    {
      path:'registrar', component: CreateAccountComponent, canActivate: [LoggedInAuthGuard]},
    {
      path: '', component: HeroComponent},
    {
      path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {
      path: 'new', component: NewPostComponent, canActivate: [AuthGuard]},
    {
      path: 'view', component: PostViewComponent, canActivate: [AuthGuard]},

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
