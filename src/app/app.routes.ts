import { Routes } from '@angular/router';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { AllRecipesComponent } from './pages/all-recipes/all-recipes.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MainPageComponent },
      { path: 'recipe/:id', component: RecipeDetailComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [() => authGuard()]
      },
      {
        path: 'favorites',
        component: FavoritesPageComponent,
        canActivate: [() => authGuard()]
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [() => authGuard(), () => adminGuard()]
      },
      { path: 'all-recipes', component: AllRecipesComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
