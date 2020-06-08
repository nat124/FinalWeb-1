import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
//   styleUrls: ['./question-list.component.css']
})
export class AnswerComponent implements OnInit {

        
    UserId: number;
    all: any;
  Id: any;
  update: boolean;
  model: { RepliedById: number; Answer: any; QuestionsId: any; };
      
        constructor(public service: QuestionService,
          private route:ActivatedRoute,
          private Router:Router) { }
      
        ngOnInit() {
          debugger
          this.update=false;
            this.UserId=+localStorage.getItem("UserId");
            this.route.queryParams.subscribe(params => {
              this.Id = params['id'];
           
        })
        this.GetA();
      }
        GetA()
        {
            this.service.getAnsByQId(this.Id).subscribe((x:any)=>{
              debugger
                this.all=x;
                
            })
        }
        save(ans)
        {
          this.model={
            RepliedById:this.UserId,
            Answer:ans,
            QuestionsId:this.Id
          }
          this.service.addA(this.model).subscribe(x=>{
            if(x)
            this.Router.navigate(['/vendor/question']);
          })
        }
      
        
      }
      