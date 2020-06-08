import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {

  constructor(private http:HttpClient,
    private router: Router) { }
    readonly url=new CommonService().getUri();

    getQA(VariantId:any){
        return this.http.get(this.url+"question/getQA?VariantId="+VariantId);
    }
    getTotal(VariantId:any){
      return this,this.http.get(this.url+"question/getTotal?VariantId"+VariantId);
    }
    getMore(VariantId:any,count:any){
      return this.http.get(this.url+"question/getMore?VariantId="+VariantId+"&Count="+count);
    }
    addQ(model:any){
      return this.http.post(this.url+"question/addQ",model)
    }

}
