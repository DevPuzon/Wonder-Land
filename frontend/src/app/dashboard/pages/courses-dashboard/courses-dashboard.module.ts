import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursesDashboardPageRoutingModule } from './courses-dashboard-routing.module';

import { CoursesDashboardPage } from './courses-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursesDashboardPageRoutingModule
  ],
  declarations: [CoursesDashboardPage]
})
export class CoursesDashboardPageModule {}
