import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasComponent } from './citas.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const citasRoutes: Routes = [
  {
    path: '',
    component: CitasComponent
  }
] 

@NgModule({
  declarations: [
    CitasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(citasRoutes),
    SharedModule
  ]
})
export class CitasModule { }
