import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HomelayoutComponent } from './homelayout/homelayout.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';



import{RouterModule} from '@angular/router';
import { VendorlayoutComponent } from './vendorlayout/vendorlayout.component';
import { CheckoutlayoutComponent } from './checkoutlayout/checkoutlayout.component';
import { LiveReportlayoutComponent } from './live-reportlayout/live-reportlayout.component';
import { LogslayoutComponent } from './logslayout/logslayout.component';
import { HttpClient } from '@angular/common/http';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [HomelayoutComponent,AdminlayoutComponent,VendorlayoutComponent, CheckoutlayoutComponent, LiveReportlayoutComponent, LogslayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule, TranslateModule.forRoot(
      ),


  ],
  exports:[AdminlayoutComponent,HomelayoutComponent,VendorlayoutComponent,LiveReportlayoutComponent,LogslayoutComponent],
})
export class LayoutsModule { }
