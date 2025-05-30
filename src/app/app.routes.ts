import { Routes } from '@angular/router';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MainPageComponent },
      { path: 'recipe/:id', component: RecipeDetailComponent },
    ]
  },
  {
    path: 'settings',
    component: SettingsLayoutComponent,
    children: [
      { path: '', component: SettingsPageComponent }
    ]
  },
  { path: '**', redirectTo: 'home' }
];
