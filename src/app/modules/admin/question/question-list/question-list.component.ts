import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
//   styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

        count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
        pageSize: any;
    UserId: number;
    all: any[]=[];
      
        constructor(public service: QuestionService,private toastr:ToastrService) { }
      
        ngOnInit() {
            this.UserId=+localStorage.getItem("UserId");
          this.page = 1;
          this.pageSize = 10;
           this.GetQ(this.page);
        }
        GetQ(page:any)
        {
            this.service.getQForAdmin(page).subscribe((x:any)=>{
                this.all=x;
                this.count=x[0].Total;
            })
        }
        delete(id)
        {
          if (confirm('Are you sure you want to delete this question?')) {
      
            this.service.delete(id).subscribe(res => {
            this.GetQ(1)
              this.toastr.warning('Deleted successfully');
            });
          }
        }
      
        prevPage() {
          this.page = this.page - 1;
          this.GetQ(this.page);
        }
        nextPage() {
          this.page = this.page + 1;
          this.GetQ(this.page);
        }
        goToPage(event) {
          this.page = event;
          this.GetQ(this.page);
        }
      
        newPageSize(e) {
          if (e == 0) {
            e = this.count;
          }
          this.perPage = e;
          this.GetQ(this.page);
        }
      
        search(){
          this.page=1;
          this.GetQ(this.page);
        }
      
      }
      