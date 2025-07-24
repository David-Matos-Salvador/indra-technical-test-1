import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

export default [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        /* path: 'admin', */
        path: '',
        loadChildren: () => import('./vehicle/vehicle.routes'),
      },
    ]
  }
] as Routes;
