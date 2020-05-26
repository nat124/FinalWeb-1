import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../customer-list/customers.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ReportService } from "../report.service";
import { chatService } from '../../chat/chat.service';

@Component({
  selector: 'app-chat-Report',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatReportComponent implements OnInit {

  public dataList: any = [];
  selectedVal: string;
  constructor(private service: chatService, private toastr: ToastrService
    , private Router: Router,public report:ReportService) { }


  count: number = 0; page: number = 1; perPage: number = 10; pagesToShow: number = 10;
  SearchName: any;
  pageSize: any;


  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.SearchName = "";

    this.getCustomers();

  }

  getCustomers() {
    this.report.getChatReport(this.page, this.pageSize, this.SearchName).toPromise().then((data: any) => {
      debugger
      this.dataList = data.data;
      this.count = data.count;
    })
  }

  goToChat(Id:any)
  {
    debugger
    this.Router.navigate(['/admin/chat'], { queryParams: { vendorChatId: Id } });
  }

  //onActivate
  onActivate(id: number, val: number) {
    if (val == 1) {
      if (confirm('Are you want to Resolve this Chat?')) {
        this.service.resolveAdmin(id).subscribe(res => {
          this.getCustomers();
          this.toastr.warning('Resolved successfully', 'chat !');
        });
      }
    } else {
      if (confirm('Are you want to unresolve this chat?')) {

        this.service.unresolveAdmin(id).subscribe(res => {
          debugger
          this.getCustomers();
          this.toastr.warning('unresolved successfully', 'chat !');
        });
      }
    }
  }

  

  onEdit(id: number) {
    this.Router.navigate(['/admin/EditCustomer'], { queryParams: { Id: id } });
  }


  prevPage() {
    this.page = this.page - 1;
    this.getCustomers();
  }
  nextPage() {
    this.page = this.page + 1;
    this.getCustomers();
  }
  goToPage(event) {
    this.page = event;
    this.getCustomers();
  }

  newPageSize(e) {
    if (e == 0) {
      e = this.count;
    }
    this.perPage = e;
    this.getCustomers();
  }

  search() {
    this.page = 1;
    this.getCustomers();
  }


}
