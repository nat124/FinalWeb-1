import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationStateServiceService } from '../../services/application-state-service.service';
import { QuestionAnswerService } from './question-answer.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent implements OnInit {
  all: any[]=[];
  UserId: number;
@Input() VariantId
  ProductVariantDetailId: any;
  model: any;
  Total: any;
  constructor(
    private service:QuestionAnswerService
  ) { }

  ngOnInit() {
    this.UserId=+localStorage.getItem("UserId");
    this.ProductVariantDetailId=this.VariantId
    debugger
    this.getTotal();
    this.getQA();

  }
  getQA(){
    this.service.getQA(this.ProductVariantDetailId).subscribe((first:any)=>{
      this.all=first;
    })
  }
  postQ(ques){
this.model={
      CustomerId:this.UserId,
      Question:ques,
      ProductVariantDetailId:this.ProductVariantDetailId
    }
    this.service.addQ(this.model).subscribe(x=>{
      if(x)
      this.getQA();
    })
  }
  getTotal(){
    this.service.getTotal(this.ProductVariantDetailId).subscribe(t=>{
      debugger
      this.Total=t;
    })
  }
  getMore(){
    this.service.getMore(this.ProductVariantDetailId,this.all.length).subscribe((more:any[])=>{
      debugger
     more.forEach(e => {
        this.all.push(e);
    })
      });
      
  }
}
