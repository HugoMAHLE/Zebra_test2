import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardChildComponent } from './components/dashboard-child/dashboard-child.component';
import { CasetaComponent } from './caseta/caseta.component';
import { VisitorComponent } from './visitor/visitor.component';
import { MenuComponent } from './menu/menu.component';
import { HostComponent } from './host/host.component';
import { VisitCodeComponent } from './visit-code/visit-code.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      {
        path: 'visit',
        component: VisitCodeComponent
      },
      {
        path: 'host',
        component: HostComponent
      },
      {
        path: 'caseta',
        component: CasetaComponent
      }
      ]
  }
];
