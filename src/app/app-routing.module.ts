import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: PostListComponent },
  { path: 'list', canActivate: [AuthGuard], component: PostListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: "edit/:id", canActivate: [AuthGuard], component: PostCreateComponent },
  { path: 'create-post', canActivate: [AuthGuard], component: MaincomponentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
