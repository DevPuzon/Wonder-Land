import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressDashboardPageRoutingModule } from './progress-dashboard-routing.module';

import { ProgressDashboardPage } from './progress-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressDashboardPageRoutingModule
  ],
  declarations: [ProgressDashboardPage]
})
export class ProgressDashboardPageModule {}
