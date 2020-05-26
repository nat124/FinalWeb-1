import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Message } from './chat.model';
import {chatService } from './chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorlayoutComponent } from 'src/app/shared/layouts/vendorlayout/vendorlayout.component';
import { ScrollToBottomDirective } from 'src/app/scroll-to-bottom.directive';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  implements OnInit {
  title = 'ClientApp';
  txtMessage: string = '';
  uniqueID: string = new Date().getTime().toString();
  messages :any[]=[];
  message = new Message();
  ProductId: any;
  ProductVariantDetailId: any;
  UserId: number;
  RoleId: number;
  IpAddress: string;
  model: { VendorId: number; IpAddress: string; ProductId: number; ProductVariantDetailId: number; };
  Chats: any[]=[];
  CustomerId: any;
  @ViewChild(ScrollToBottomDirective,{static:false})
  scroll: ScrollToBottomDirective;
  constructor(
    private chatService: chatService,
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private router:Router,
  ) {
    //this.subscribeToEvents();  
  }
  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.ProductId = params["Id"];
      this.ProductVariantDetailId=params["variantId"];
      this.CustomerId=params["custId"];

    });
    jQuery('.sidebar').hide();
    this.UserId=+localStorage.getItem("UserId");
    this.RoleId=+localStorage.getItem("RoleId");
    this.IpAddress=localStorage.getItem("IpAddress");
    this.subscribeToEvents();
    if(this.ProductId && this.ProductVariantDetailId)
    this.getOldMsgs();
    this.getAllChats();
  }
  
  getAllChats(){
    this.chatService.getAllVendorChats(this.UserId).subscribe((chats:any)=>{
      debugger
      this.Chats=chats;
    })
  }
  resolve(id)
  {
    this.chatService.resolve(id).subscribe(x=>{
      if(x)
      this.getAllChats();
    })
  }
  changeChat(c:any)
  {
    this.ProductId=c.ProductId;
    this.ProductVariantDetailId=c.ProductVariantDetailId;
    this.CustomerId=c.CustomerId;
    this.getOldMsgs();
  }
  bySearch(text)
  {
    if(text)
    this.chatService.searchForVendor(text,this.UserId).subscribe((data:any)=>{
      this.Chats=data;
    })
    else
    this.getAllChats();
  }
  getOldMsgs(){
    this.model={
VendorId:this.UserId,
IpAddress:this.IpAddress,
ProductId:this.ProductId,
ProductVariantDetailId:this.ProductVariantDetailId

   }
    this.chatService.getOldMsgs(this.model).subscribe((all:any[])=>{
      debugger
      if(all.length>0)
      this.messages=all;
      else
      this.router.navigate(['/vendor/chat']);
      // else
      // this.getinitialdata();
     // window.location.href="/vendor/chat";

    })
  }
  getinitialdata(){
    this.chatService.getInitalData(this.model).subscribe((data:any[])=>{
      debugger
      this.messages=data;
    })

  }
  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = "sent";
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.message.ProductId=this.ProductId;
      this.message.ProductVariantDetailId=this.ProductVariantDetailId;
      if(this.RoleId==2)
      {
      this.message.VendorId=this.UserId;
      this.message.VendorMsg=this.txtMessage;
      this.message.CustomerId=this.CustomerId;
      }
      else
      {
      this.message.CustomerId=this.UserId;
      this.message.CustomerMsg=this.txtMessage;
      }
      this.message.IpAddress=this.IpAddress;
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.chatService.saveInDb(this.message).subscribe(x=>{
        this.txtMessage = '';
      })
    }
  }
  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      debugger
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = "received";
          this.messages.push(message);
        }
      });
    });
  }

}
