import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';
@Injectable({
  providedIn: 'root'
})
export class NotiService {
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
getNotification(model:any){
  return this.http.post(this.url+'notification/SaveNotification',model)
}
getListNoti(){
  return this.http.get(this.url+'notifcation/getNotification')
}
deleteNotification(Id:number){
  return this.http.get(this.url+'notifcation/deleteNoti?Id='+Id)
}
}
