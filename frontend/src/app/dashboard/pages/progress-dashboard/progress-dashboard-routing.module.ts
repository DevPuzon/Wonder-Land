import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressDashboardPage } from './progress-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressDashboardPageRoutingModule {}
