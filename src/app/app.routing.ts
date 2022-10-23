import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'consoles',
        loadComponent: () => import('./pages/consoles/consoles.component').then(m => m.ConsolesComponent),
    },
    {
        path: 'new-console',
        loadComponent: () => import('./pages/consoles/containers/new-console/new-console.component')
            .then(m => m.NewConsoleComponent)
    },
    {
        path: 'revenue',
        loadComponent: () => import('./pages/revenue/revenue.component')
            .then(m => m.RevenueComponent)
    },
    {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component')
            .then(m => m.SettingsComponent)
    }
];