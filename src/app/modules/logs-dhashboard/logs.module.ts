import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { TranslateModule,TranslateLoader} from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMobileComponent } from './dashboard-mobile/dashboard-mobile.component';
import { TrackDhashboardComponent } from './track-dhashboard/track-dhashboard.component';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
const routes: Routes = [
  //{
    //path: 'liveTraffic', component: LiveTrafficComponent }
 // }
 { path: 'trackMobileDhash', component: DashboardMobileComponent },
 {
  path:'trackDashboard',component:TrackDhashboardComponent
},
]


@NgModule({
  declarations: [DashboardMobileComponent,TrackDhashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(
      ),
      RouterModule.forChild(routes),
      BsDatepickerModule.forRoot(),
      TabModule
  ]
  ,
  exports:[CommonModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class LogsModule { }
