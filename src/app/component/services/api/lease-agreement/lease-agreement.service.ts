import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaseAgreementRepresentation } from '../module/lease-agreement-representation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaseAgreementService {

  private baseUrl : string= 'http://localhost:8010/api/v1/lease-agreement'; 

  constructor(
    private http:HttpClient
  ) { }

  createLeaseAgreement(leaseAgreement:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,leaseAgreement);
      }else{
        return this.http.put(this.baseUrl+"/"+leaseAgreement.id,leaseAgreement);
    }
        
  }

  GetAllLeaseAgreements():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  GetLeaseAgreementsById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeleteLeaseAgreementById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }


}
