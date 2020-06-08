import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Message } from './vendor-chat.model';
import { VendorchatService } from './vendor-chat.service';
import { ActivatedRoute } from '@angular/router';
import { ScrollToBottomDirective } from 'src/app/scroll-to-bottom.directive';
import { Text } from '@angular/compiler/src/i18n/i18n_ast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendor-chat',
  templateUrl: './vendor-chat.component.html',
  styleUrls: ['./vendor-chat.component.css']
})
export class VendorChatComponent  implements OnInit {
  @ViewChild(ScrollToBottomDirective,{static:false})
  scroll: ScrollToBottomDirective;
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
  model: { CustomerId: number; IpAddress: string; ProductId: number; ProductVariantDetailId: number; };
  Chats: any[]=[];
  imageUrl: any;
  fileToUpload: any;
  display: string="none";
  imagePath: any;
  constructor(
    private chatService: VendorchatService,
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private toster:ToastrService
  ) {
    //this.subscribeToEvents();  
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.ProductId = params["Id"];
      this.ProductVariantDetailId=params["variantId"];
    });
    this.UserId=+localStorage.getItem("UserId");
    this.RoleId=+localStorage.getItem("RoleId");
    this.IpAddress=localStorage.getItem("IpAddress");
    this.subscribeToEvents();
    this.getOldMsgs();
    this.getAllChats();
  }
  getAllChats(){
    this.chatService.getAllChats(this.UserId).subscribe((chats:any)=>{
      debugger
      this.Chats=chats;
    })
  }
  changeChat(c:any)
  {
    this.ProductId=c.ProductId;
    this.ProductVariantDetailId=c.ProductVariantDetailId;
    this.getOldMsgs();
  }
  bySearch(text)
  {
    if(Text)
    this.chatService.search(text,this.UserId).subscribe((data:any)=>{
      this.Chats=data;
    })
    else
    this.getAllChats();
  }
  getOldMsgs(){
    
    this.model={
CustomerId:this.UserId,
IpAddress:this.IpAddress,
ProductId:this.ProductId,
ProductVariantDetailId:this.ProductVariantDetailId

   }
    this.chatService.getOldMsgs(this.model).subscribe((all:any[])=>{
      debugger
      if(all.length>0)
      this.messages=all;
      else
      this.getinitialdata();
    })
  }
  getinitialdata(){
    this.chatService.getInitalData(this.model).subscribe((data:any[])=>{
      this.messages=data;
    })

  }
  sendMessage(): void {
    debugger
    if (this.txtMessage||this.imageUrl) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = "sent";
      this.message.message = this.txtMessage==null?this.imageUrl:this.txtMessage;
      this.message.attachment=this.imageUrl;
      this.message.date = new Date();
      this.message.ProductId=this.ProductId;
      this.message.ProductVariantDetailId=this.ProductVariantDetailId;
      if(this.RoleId==2)
      {
      this.message.VendorId=this.UserId;
      this.message.VendorMsg=this.txtMessage;
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
