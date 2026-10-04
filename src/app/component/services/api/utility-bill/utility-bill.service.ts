import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityBillRepresentation } from '../module/utility-bill-representation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityBillService {

  private baseUrl : string= 'http://localhost:8010/api/v1/utility_bill'; 

  constructor(
    private http:HttpClient
  ) { }

  createUtilityBill(utilityBill:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,utilityBill);
      }else{
        return this.http.put(this.baseUrl+"/"+utilityBill.id,utilityBill);
    }
        
  }

  GetAllUtilityBills():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  GetUtilityBillsById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeleteUtilityBillById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }


}
