import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SharedModule } from '../../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const signUpRoutes: Routes = [
  {
    path: '',
    component: SignUpComponent
  }
]

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(signUpRoutes)
  ]
})
export class SignUpModule { }
