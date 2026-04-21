import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros';
import { LoginComponent } from './login/login';
import { DashboardEstudianteComponent } from './dashboard-estudiante/dashboard-estudiante';
import { DashboardProfesorComponent } from './dashboard-profesor/dashboard-profesor';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin';
import { BlogComponent } from './blog.component/blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/estudiante', component: DashboardEstudianteComponent },
  { path: 'dashboard/profesor', component: DashboardProfesorComponent },
  { path: 'dashboard/admin', component: DashboardAdminComponent },
  { path: 'blog', component: BlogComponent },
];
