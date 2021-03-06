import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from "../../services/common.service";
import { JsonPipe } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class VendorLayoutService {
      
    data = new CommonService();
    private url = this.data.getUri();

    constructor(
        private http: HttpClient
    ) { }

    getUserNotification(id: number, action: string) {
        debugger
        var url = this.url + 'notification/getUsersNotifications?userId=' + id + "&action=";
        if (action)
            url = url + "all"
        return this.http.get(url);
    }
    Count(id)
{
    return this.http.get(this.url+'notification/count?UserId='+id);
}
    readUserNotification(id: number) {
        return this.http.get(this.url + 'notification/readUserNotification?id=' + id)
    }

    removeUserNotification(id: number) {
        return this.http.get(this.url + 'notification/removeUserNotification?id=' + id)
    }
    delete(id:number)
    {
        return this.http.get(this.url + 'notification/delete?id=' + id)
    }
    deleteNotification(id) {
        return this.http.get(this.url + 'notification/delete?id=' + id)
    }
    getSearchTerms(){
        return this.http.get(this.url + 'searchTerm/getSearchtermdata')
    }
}
