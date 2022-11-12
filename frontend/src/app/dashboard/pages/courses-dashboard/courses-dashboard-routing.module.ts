import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesDashboardPage } from './courses-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: CoursesDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesDashboardPageRoutingModule {}
