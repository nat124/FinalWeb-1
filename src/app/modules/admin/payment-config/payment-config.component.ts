import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PayService } from "./pay.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-config',
  templateUrl: './payment-config.component.html',
  styleUrls: ['./payment-config.component.css']
})
export class PaymentConfigComponent implements OnInit {

  constructor(
    public pay:PayService,
    public toaster:ToastrService
  ) { }

  ngOnInit() {
    this.pay.getPayConfig().subscribe((x:any)=>{
      debugger
      this.paymentForm.patchValue(x)
    })
  }

  paymentForm =new FormGroup({
    amount: new FormControl(0,Validators.required),
    Percentage:new FormControl(0.0,Validators.required),
    IsApplied:new FormControl(true)
  })
  onSubmit(){
    debugger
    this.paymentForm.value
    this.pay.SavePaymentConfig(this.paymentForm.value).subscribe(x=>{
this.toaster.info("Saved Successfully")
    })
  }
}
