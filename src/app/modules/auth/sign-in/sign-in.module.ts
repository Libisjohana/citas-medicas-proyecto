import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { RouterModule } from '@angular/router';
import { signInRoutes } from './sign-in.routing';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(signInRoutes),
    SharedModule
  ]
})
export class SignInModule { }
