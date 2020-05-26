import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { TranslateModule,TranslateLoader} from '@ngx-translate/core';
import { LiveReportlayoutComponent } from 'src/app/shared/layouts/live-reportlayout/live-reportlayout.component';
import { LiveDhashboardComponent } from './live-dhashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LiveTrafficComponent } from './live-traffic/live-traffic.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UserLiveComponent } from './user-live/user-live.component';
import { OrderLiveComponent } from './order-live/order-live.component';
//import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';

const routes: Routes = [
  { path: 'liveTraffic', component: LiveTrafficComponent },
  { path: 'UserliveTraffic', component: UserLiveComponent },
  {path:"OrderLiveReport" ,component: OrderLiveComponent},
]
@NgModule({
  declarations: [LiveDhashboardComponent,LiveTrafficComponent,UserLiveComponent,OrderLiveComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(
      ),
      RouterModule.forChild(routes),
      BsDatepickerModule.forRoot(),



  ],
  exports:[CommonModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class liveModule { }
