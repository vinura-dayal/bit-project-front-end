import { Component } from '@angular/core';
import { RentRepresentation } from '../services/api/module/rent-representation';
import { RentService } from '../services/api/rent/rent.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent {

  rentObj:RentRepresentation = {};
  rents: Array<any> = [];
  allStatus:any;

  type:string;
  statusValue:any;
  isEditRent:boolean=false;
  dtDynamicVerticalScrollExample:any;

  canCreate = false;
  canUpdate = false;
  canDelete = false;

  constructor(
    private rentService:RentService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.isEditRent = false;
    this.canCreate = this.permissionHelper.has(AuthIds.LANDLORD_CREATE);
    this.canUpdate = this.permissionHelper.has(AuthIds.LANDLORD_UPDATE);
    this.canDelete = this.permissionHelper.has(AuthIds.LANDLORD_DELETE);
    this.GetAllStatus();
    this.GetAllRents();
}


SaveRent():void{

    this.type = this.isEditRent==false?'Add':'Update';
    if(this.type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.rentService.createRent(this.rentObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllRents();  
            }
          });
          swal("Sucessfull!", "Rent has been Adedd!", "success");
        }
       
      });
    }else{
      console.log(this.rentObj);
      
      this.rentService.createRent(this.rentObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllRents();  
            }
          });
      swal("Sucessfull!", "Rent has been updated!", "success");

  
    }

    
}

GetRentById(ID:any){
  this.rentService.GetRentsById(ID).subscribe(allData=>{ 
  this.rentObj = allData.data.dataList[0];

  this.isEditRent = true;
  this.statusValue=allData.data.dataList[0].status.name;
  this.rentObj.status = allData.data.dataList[0].status.id;
  
})
}

GetAllRents(){
  this.rentService.GetAllRents().subscribe(allData=>{
    this.rents = allData?.data?.dataList || [];
  })
}

DeleteById(ID:any){

    swal({
      title: "Are you sure",
      text: "That you want to Delete this Rent?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Order has been deleted!", "success");
        this.rentService.DeleteRentById(ID).subscribe(allData=>{
          this.GetAllRents();
        })
      }
    });

}

GetAllStatus(){
  this.statusService.GetAllStatus().subscribe(allData=>{
    this.allStatus = allData.data.dataList; 
    
  })
}

onChangeStatus(E:any){
  this.rentObj.status = E.target.value;
  
}

}
