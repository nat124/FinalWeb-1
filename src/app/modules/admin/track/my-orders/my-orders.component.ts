import { Component, OnInit } from '@angular/core';
import { TrackService } from '../track.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  data: any;
  realData: any;
  display = 'none';
 display1='none'
Users:any
Result:any
Action:any
date:any
address:any[]
  sessions: any;

  constructor(
    public service:TrackService,
    public datepipe:DatePipe,
    public toaster:ToastrService
  ) { }

  ngOnInit() {
    this.service.getUserIds().subscribe(x=>{
this.Users=x as []
    })
  this.service.trackMyOrders().subscribe(x=>{
    debugger
    this.data=x as []
    this.realData=this.data
  }
    )
  }
  Filter(event:any){
    debugger
   this.data=this.realData
var value=+event.target.value
var array;
if(value==3)
array=this.data.filter(x=>x.LogtypeId==1)
else if(value==2)
array=this.data.filter(x=>x.LogtypeId==2)
else if(value==1)
array=this.data.filter(x=>x.LogtypeId==3)
this.data=array
  }
  userFilter(event:any){
    debugger
    var value=+event.target.value
var array=this.data.filter(x=>x.UserId==value)
if(array.length>0)
this.data=array
else
this.toaster.info("No user  data on selected date")

  }
  Filter2(event:any,val){
    debugger
    var filter= new Date(val)
    var newDate=this.datepipe.transform(filter,'yyyy-MM-dd HH:mm:ss')
    //var filterData= this.data.filter(x=>new Date(x.ActionDateTime)==new Date(newDate))
this.service.getFilterAccordingDate(newDate,"MyOrders").subscribe((x:any)=>{
  debugger
  if(x.length==0)
  this.toaster.info("No data on selected date")
else
    this.sessions=x as []
});

//     this.data=this.realData
// var value=+event.target.value
// var array=this.data.filter(x=>x.UserId==value)
// this.data=array
  }
  Filter3(event:any){
    debugger
    this.data=this.realData
    var value=event.target.value
    var array=this.data.filter(x=>x.Guid==value)
    this.data=array
  }
  getValue(val:number){
    debugger
    this.data=this.realData

   var array=this.data.filter(x=>x.Id==val)
   this.Result=JSON.parse(array[0].Res)
    this.Action=array.ActionName
    this.display='block'
   this.data=array
  }


}
