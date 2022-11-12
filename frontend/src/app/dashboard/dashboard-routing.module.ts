import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [ 
  {
    path: '',
    component: DashboardPage,
    children:[ 
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home-dashboard/home-dashboard.module').then( m => m.HomeDashboardPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard-dashboard/dashboard-dashboard.module').then( m => m.DashboardDashboardPageModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/courses-dashboard/courses-dashboard.module').then( m => m.CoursesDashboardPageModule)
      },
      {
        path: 'lecture',
        loadChildren: () => import('./pages/lecture/lecture.module').then( m => m.LecturePageModule)
      },
      {
        path: 'progress',
        loadChildren: () => import('./pages/progress-dashboard/progress-dashboard.module').then( m => m.ProgressDashboardPageModule)
      }
    ]
  },   

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
