import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';
@Injectable({
  providedIn: 'root'
})
export class PayService {
  data=new CommonService();
  private url=this.data.getUri();
  constructor(private http:HttpClient) { }
  SavePaymentConfig(model){

    return this.http.post(this.url+'PaymentTransaction/paymentConfig', model)
   }
   getPayConfig(){
     return this.http.get(this.url+'PaymentTransaction/getPayConfig')
   }
}
