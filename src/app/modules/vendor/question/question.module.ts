import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutsModule } from 'src/app/shared/layouts/layouts.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuestionListComponent } from './question-list/question-list.component';
import { AdminPaginationModule } from '../../admin/admin-pagination/admin-pagination.module';
import { AnswerComponent } from './answer/answer.component';



const routes: Routes = [
  { path: "", component: QuestionListComponent },
  { path: "answer", component: AnswerComponent },
]

@NgModule({
  declarations: [QuestionListComponent,AnswerComponent],
  imports: [
    AdminPaginationModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutsModule,
    NgxPaginationModule,
    //TabModule,
    // BsDatepickerModule
  ],
  exports: [
    CommonModule
  ],
})
export class QuestionModule { }
