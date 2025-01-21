import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardChildComponent } from './components/dashboard-child/dashboard-child.component';
import { CasetaComponent } from './caseta/caseta.component';
import { VisitorComponent } from './visitor/visitor.component';
import { MenuComponent } from './menu/menu.component';
import { HostComponent } from './host/host.component';
import { AddVisitorComponent } from './add-visitor/add-visitor.component';
import { VisitCodeComponent } from './visit-code/visit-code.component';
import { CreateVisitComponent } from './create-visit/create-visit.component';
import { ReceptionComponent } from './reception/reception.component';
import { AuthGuard } from './auth.guard';
import { ConfirmCasetaComponent } from './confirm-caseta/confirm-caseta.component';
import { PrintComponent } from './print/print.component';
import { RecepEditComponent } from './recep-edit/recep-edit.component';
import { VisitConfirmComponent } from './visit-confirm/visit-confirm.component';
import { VideoVisitComponent } from './video-visit/video-visit.component';
import { VisitErrorComponent } from './visit-error/visit-error.component';

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
        path: 'host',
        component: HostComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'createvisit',
        component: CreateVisitComponent
      },
      {
        path: 'addvisitor',
        component: AddVisitorComponent
      },
      {
        path: 'createvisitor',
        component: VisitorComponent
      }
    ]
  },
  {
    path: 'reception',
    component: ReceptionComponent,
    children: [
      {
        path: 'Confirm&Edit',
        component: ConfirmCasetaComponent
      },
      {
        path: 'EditReception',
        component: RecepEditComponent
      },
      {
        path: 'Print',
        component: PrintComponent
      }
    ]
  },
  {
    path: 'visitor',
    component: VisitCodeComponent,
    children: [
      {
        path: 'ConfirmVisit',
        component: VisitConfirmComponent
      },
      {
        path: 'Video',
        component: VideoVisitComponent
      },
      {
        path: 'Error',
        component: VisitErrorComponent
      }
    ]
  },
  {
    path: 'security',
    component: CasetaComponent,
    children: [
      {
        path: 'confirm',
        component: ConfirmCasetaComponent
      }
    ]
  }
];
