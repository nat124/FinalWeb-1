import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PayService } from '../payment-config/pay.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotiService } from "./noti.service";

@Component({
  selector: 'app-pistis-event-noti',
  templateUrl: './pistis-event-noti.component.html',
  styleUrls: ['./pistis-event-noti.component.css']
})
export class PistisEventNotiComponent implements OnInit {
  constructor(
    public pay:PayService,
    public toaster:ToastrService,
    public noti:NotiService

  ) { }

  ngOnInit() {
    // this.pay.getPayConfig().subscribe((x:any)=>{
    //   debugger
    //   this.paymentForm.patchValue(x)
    // })
  }

  paymentForm =new FormGroup({
    Description: new FormControl("",Validators.required),
    SpanishDescription:new FormControl("",Validators.required),
    SpanishTitle:new FormControl("",Validators.required),
    Tittle:new FormControl("",Validators.required),
    TargetUrl:new FormControl("",Validators.required),
    AllUsers:new FormControl()
  })
  onSubmit(){
    debugger
    this.paymentForm.value
    this.noti.getNotification(this.paymentForm.value).subscribe(x=>{
this.toaster.info("Saved Successfully")
    })
  }


}
