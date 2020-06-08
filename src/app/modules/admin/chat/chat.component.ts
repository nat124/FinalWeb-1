import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Message } from './chat.model';
import {chatService } from './chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorlayoutComponent } from 'src/app/shared/layouts/vendorlayout/vendorlayout.component';
import { ScrollToBottomDirective } from 'src/app/scroll-to-bottom.directive';
import { ToastrService } from 'ngx-toastr';

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
  VendorId: any;
  vendorChatId: any;
  @ViewChild(ScrollToBottomDirective,{static:false})
  scroll: ScrollToBottomDirective;
  imageUrl: any;
  fileToUpload: any;
  display: string="none";
  imagePath: any;
  constructor(
    private chatService: chatService,
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private router:Router,
    private toster:ToastrService
  ) {
    //this.subscribeToEvents();  
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      debugger
      this.ProductId = params["Id"];
      this.ProductVariantDetailId=params["variantId"];
      this.CustomerId=params["custId"];
this.vendorChatId=params["vendorChatId"];
    });
    jQuery('.sidebar').hide();
    this.UserId=+localStorage.getItem("UserId");
    this.RoleId=+localStorage.getItem("RoleId");
    this.IpAddress=localStorage.getItem("IpAddress");
    this.subscribeToEvents();
    if(this.ProductId && this.ProductVariantDetailId)
    this.getOldMsgs();
    this.getAllChats();
    if(this.vendorChatId)
    this.getParticularChat(this.vendorChatId);
  }
  getAllChats(){
    this.chatService.getAllAdminChats().subscribe((chats:any)=>{
      this.Chats=chats;
    })
  }
  resolve(id)
  {
    this.chatService.resolve(id).subscribe(x=>{
      if(x)
      this.getAllChats();
      this.getOldMsgs();
    })
  }
  unresolve(id)
  {
    this.chatService.unresolve(id).subscribe(x=>{
      if(x)
      this.getAllChats();
      this.getOldMsgs();
    })
  }
  getParticularChat(vendorChatId)
  {
this.chatService.getChatById(vendorChatId).subscribe((x:any)=>{
  this.ProductId=x.ProductId;
  this.ProductVariantDetailId=x.ProductVariantDetailId;
  this.CustomerId=x.CustomerId;
  this.VendorId=x.VendorId;
  this.getOldMsgs();
})
  }
  changeChat(c:any)
  {
    this.ProductId=c.ProductId;
    this.ProductVariantDetailId=c.ProductVariantDetailId;
    this.CustomerId=c.CustomerId;
    this.VendorId=c.VendorId;
    this.getOldMsgs();
  }
  bySearch(text)
  {
    if(text)
    this.chatService.searchForAdmin(text).subscribe((data:any)=>{
      this.Chats=data;
    })
    else
    this.getAllChats();
  }
  getOldMsgs(){
    this.model={
VendorId:this.VendorId,
IpAddress:this.IpAddress,
ProductId:this.ProductId,
ProductVariantDetailId:this.ProductVariantDetailId

   }
    this.chatService.getOldMsgs(this.model).subscribe((all:any[])=>{
      debugger
      if(all.length>0)
      this.messages=all;
      else
      this.router.navigate(['/admin/chat']);
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
     
      this.message.VendorId=this.VendorId;
      this.message.VendorMsg=this.txtMessage;
      this.message.CustomerId=this.CustomerId;
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

  onSelectFile(event) {
    const file = event.target.files[0];
    const typeFile = file.type.split('/');
    if(typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' ){ 
    if (event.target.files && event.target.files[0]) {

      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          ;
          this.imageUrl = event.target.result;
          //this.model.Image=this.imageUrl;
          //this.model.Id=0;
          //this.urls.push(event.target.result); 
         this.sendMessage();
       
        }
        this.fileToUpload = event.target.files[i]
        reader.readAsDataURL(this.fileToUpload);
      }
    }}else{
      this.toster.error('Please select jpeg or .png Image !');
    }

  }
  openModal(path:any) {

    this.display = 'block';
this.imagePath=path;
  }
  onCloseHandled() {
    this.display = 'none';}
}
