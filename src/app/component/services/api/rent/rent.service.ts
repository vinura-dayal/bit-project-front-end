import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RentRepresentation } from '../module/rent-representation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private baseUrl : string= 'http://localhost:8010/api/v1/rent_payment'; 

  constructor(
    private http:HttpClient
  ) { }

  createRent(rent:any,type:any):Observable<any>{
      if(type=='Add'){
        return this.http.post(this.baseUrl,rent);
      }else{
        return this.http.put(this.baseUrl+"/"+rent.id,rent);
    }
        
  }

  GetAllRents():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  GetRentsById(ID:any):Observable<any>{
    return this.http.get(this.baseUrl+"/"+ID);
  }

  DeleteRentById(ID:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+ID)
  }


}
