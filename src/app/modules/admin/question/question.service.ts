import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  data = new CommonService();

  private url = this.data.getUri();
  products: any;
  Countries: any;
  constructor(private http: HttpClient) {}
  getQForAdmin(page:any){
      return this.http.get(this.url+"question/getQForAdmin?page="+page);
  }
  getAnsByQId(id)
  {
      return this.http.get(this.url+"question/getAnsByQId?Id="+id);
  }
  addA(model:any)
  {
    return this.http.post(this.url+"question/addA",model);
  }
  delete(id:any){
    return this.http.get(this.url+"question/delete?Id="+id);
  }
}
