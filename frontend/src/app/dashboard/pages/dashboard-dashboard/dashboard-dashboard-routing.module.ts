import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDashboardPage } from './dashboard-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDashboardPageRoutingModule {}
