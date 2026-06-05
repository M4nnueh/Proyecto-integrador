import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register.component';
import { DashboardEstudianteComponent } from './dashboard-estudiante/dashboard-estudiante';
import { DashboardProfesorComponent } from './dashboard-profesor/dashboard-profesor';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin';
import { BlogComponent } from './blog.component/blog.component';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { Temas } from './temas/temas';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { estudianteGuard } from './auth/role.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'evaluar', component: EvaluarComponent, canActivate: [estudianteGuard] },
  { path: 'temas', component: Temas },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/estudiante', component: DashboardEstudianteComponent },
  { path: 'dashboard/profesor', component: DashboardProfesorComponent },
  { path: 'dashboard/admin', component: DashboardAdminComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'anuncios', component: AnunciosComponent },
  { path: 'preguntas', component: PreguntasComponent },
];