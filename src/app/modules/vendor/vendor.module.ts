import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ProductsModule } from '../admin/products/products.module';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { LayoutModule } from '@angular/cdk/layout';
import { StocksModule } from './stocks/stocks.module';
import { VendorPaginationComponent } from './vendor-pagination/vendor-pagination.component';
import { VendorPaginationModule } from './vendor-pagination/vendor-pagination.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReportModule } from './report/report.module';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { chatService } from './chat/chat.service';
import { QuestionModule } from './question/question.module';
import { ScrollToBottomDirective } from 'src/app/scroll-to-bottom.directive';

const DROPZONECONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 5,
  acceptedFiles: 'image/jpg,image/png,image/jpeg/*'
};
const routes: Routes = [
  {path:"chat",component:ChatComponent},
  { path: "welcome", component: WelcomeComponent },

  {
    path: "products", loadChildren: 'src/app/modules/vendor/vendor-products/vendor-products.module#VendorProductsModule'
  },
  {
    path: "stocks", loadChildren: 'src/app/modules/vendor/stocks/stocks.module#StocksModule'
  },
  {
    path: "dashboard", loadChildren: 'src/app/modules/vendor/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: "question", loadChildren: 'src/app/modules/vendor/question/question.module#QuestionModule'
  },
  {
    path: "profile", loadChildren: 'src/app/modules/vendor/profile/profile.module#ProfileModule'
  },
  {
    path: "report", loadChildren: 'src/app/modules/vendor/report/report.module#ReportModule'
  }

]

@NgModule({
  declarations: [WelcomeComponent,ChatComponent],
  imports: [
    QuestionModule,
    LayoutModule,
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot(
   ),
    FormsModule,
    ReactiveFormsModule,
    ProductsModule,
    DropzoneModule,
    StocksModule,
    NgxPaginationModule,
    VendorPaginationModule,
    ReportModule
  ],
  exports: [
    CommonModule
  ],
  providers: [
    chatService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DROPZONECONFIG
    }
  ],
})
export class VendorModule { }
