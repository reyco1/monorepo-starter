import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { authResolver } from './core/resolvers/auth.resolver';
import { AppLayout } from './core/layouts/app.layout';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    resolve: { auth: authResolver },
    children: [
      { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [authGuard]
      },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];
