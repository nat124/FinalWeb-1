
import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import { Message } from './chat.model';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable()
export class chatService {
  readonly baseuri = new CommonService().getUri();

  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor(
    private http: HttpClient
  ) {
     this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }
  saveInDb(message:Message)
  {
    return this.http.post(this.baseuri+"chat/add",message);
  }
  search(text,UserId){
  return this.http.get(this.baseuri+"chat/search?text="+text+"&UserId="+UserId);
  }
  searchForVendor(text,UserId){
    return this.http.get(this.baseuri+"chat/searchForVendor?text="+text+"&UserId="+UserId);
    }
  getAllChats(UserId)
  {
    return this.http.get(this.baseuri+"chat/getAllChats?UserId="+UserId);
  }
  getAllVendorChats(UserId)
  {
    return this.http.get(this.baseuri+"chat/getAllVendorChats?UserId="+UserId);
  }
  resolve(id)
  {
    return this.http.get(this.baseuri+"chat/resolve?id="+id);
  }
  getOldMsgs(model:any){
    return this.http.post(this.baseuri+"chat/getOldMsgs",model);

  }
  getInitalData(model:any)
  {
    return this.http.post(this.baseuri+"chat/getInitalData",model);
  }
  sendMessage(message: Message) {
debugger
    this._hubConnection.invoke('NewMessage', message);
  }

 

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44343/chat/index",{
        skipNegotiation:true,
        transport:signalR.HttpTransportType.WebSockets
      })
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
     this._hubConnection.on('MessageReceived', (data: any) => {
      this.messageReceived.emit(data);
     });
  }
}    