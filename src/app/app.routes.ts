import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./modules/countries/countries.component')
    },
    {
        path: '**',
        redirectTo: ''
    }
];
