import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'citas'
      },
      {
        path: 'citas',
        loadChildren: () => import('./citas/citas.module').then( m => m.CitasModule)
      },
    ]
  }
]


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(mainRoutes)
  ]
})
export class MainModule { }
