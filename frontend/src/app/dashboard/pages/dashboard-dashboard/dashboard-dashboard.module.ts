import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDashboardPageRoutingModule } from './dashboard-dashboard-routing.module';

import { DashboardDashboardPage } from './dashboard-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardDashboardPageRoutingModule
  ],
  declarations: [DashboardDashboardPage]
})
export class DashboardDashboardPageModule {}
