import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./Components/home/home.component').then((m) => m.HomeComponent) },
  { path: 'memberDetails/:id', loadComponent: () => import('./Components/member-details/member-details.component').then((m) => m.MemberDetailsComponent) }
];
