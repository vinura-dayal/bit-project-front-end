import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TenantRepresentation } from '../module/tenant-representation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private baseUrl : string= 'http://localhost:8010/api/v1/tenant'; 

  constructor(
    private http:HttpClient
  ) { }

  createTenant(tenant:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,tenant);
      }else{
        return this.http.put(this.baseUrl+"/"+tenant.id,tenant);
    }
        
  }

  GetAllTenants(page?: number, size?: number):Observable<any>{
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

  GetTenantsById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeleteTenantById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }


}
