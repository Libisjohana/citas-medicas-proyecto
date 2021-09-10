import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'account'
    },
    {
        path: 'account',
        component: AppComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'sign-in'
            },
            {
                path: 'sign-in',
                loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.SignInModule)
            },
            { 
                path: 'sign-up', 
                loadChildren: () => import('./modules/auth/sign-up/sign-up.module').then(m => m.SignUpModule)
            },
        ]
    },
    {
        path: 'main',
        loadChildren: () => import('./modules/main/main.module').then( m => m.MainModule )
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
