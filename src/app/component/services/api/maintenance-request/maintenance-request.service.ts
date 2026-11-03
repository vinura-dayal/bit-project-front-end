import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaintenanceRequestRepresentation } from '../module/maintenance-request-representation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService {

  private baseUrl : string= 'http://localhost:8010/api/v1/maintenance_request'; 

  constructor(
    private http:HttpClient
  ) { }

  createMaintenanceRequest(maintenanceRequest:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,maintenanceRequest);
      }else{
        return this.http.put(this.baseUrl+"/"+maintenanceRequest.id,maintenanceRequest);
    }
        
  }

  GetAllMaintenanceRequests(page?: number, size?: number):Observable<any>{
    if (page === undefined || size === undefined) {
      return this.http.get(this.baseUrl);
    }
    return this.http.get(this.baseUrl, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  GetMaintenanceRequestsById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeleteMaintenanceRequestById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }


}
