import { Component } from '@angular/core';
import { MaintenanceRequestRepresentation } from '../services/api/module/maintenance-request-representation';
import { MaintenanceRequestService } from '../services/api/maintenance-request/maintenance-request.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';

@Component({
  selector: 'app-maintenanceRequest',
  templateUrl: './maintenance-request.component.html',
  styleUrls: ['./maintenance-request.component.scss']
})
export class MaintenanceRequestComponent {

  maintenanceRequestObj:MaintenanceRequestRepresentation = {};
  maintenanceRequests: Array<any> = [];
  allStatus:any;

  type:string;
  statusValue:any;
  isEditMaintenanceRequest:boolean=false;
  dtDynamicVerticalScrollExample:any;

  canCreate = false;
  canUpdate = false;
  canDelete = false;

  constructor(
    private maintenanceRequestService:MaintenanceRequestService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.isEditMaintenanceRequest = false;
    this.canCreate = this.permissionHelper.has(AuthIds.MAINTENANCE_REQUEST_CREATE);
    this.canUpdate = this.permissionHelper.has(AuthIds.MAINTENANCE_REQUEST_UPDATE);
    this.canDelete = this.permissionHelper.has(AuthIds.MAINTENANCE_REQUEST_DELETE);
    this.GetAllStatus();
    this.GetAllMaintenanceRequests();
}


SaveMaintenanceRequest():void{

    this.type = this.isEditMaintenanceRequest==false?'Add':'Update';
    if(this.type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.maintenanceRequestService.createMaintenanceRequest(this.maintenanceRequestObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllMaintenanceRequests();  
            }
          });
          swal("Sucessfull!", "MaintenanceRequest has been Adedd!", "success");
        }
       
      });
    }else{
      console.log(this.maintenanceRequestObj);
      
      this.maintenanceRequestService.createMaintenanceRequest(this.maintenanceRequestObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllMaintenanceRequests();  
            }
          });
      swal("Sucessfull!", "MaintenanceRequest has been updated!", "success");

  
    }

    
}

GetMaintenanceRequestById(ID:any){
  this.maintenanceRequestService.GetMaintenanceRequestsById(ID).subscribe(allData=>{ 
  this.maintenanceRequestObj = allData.data.dataList[0];

  this.isEditMaintenanceRequest = true;
  this.statusValue=allData.data.dataList[0].status.name;
  this.maintenanceRequestObj.status = allData.data.dataList[0].status.id;
  
})
}

GetAllMaintenanceRequests(){
  this.maintenanceRequestService.GetAllMaintenanceRequests().subscribe(allData=>{
    this.maintenanceRequests = allData?.data?.dataList || [];
  })
}

DeleteById(ID:any){

    swal({
      title: "Are you sure",
      text: "That you want to Delete this MaintenanceRequest?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Order has been deleted!", "success");
        this.maintenanceRequestService.DeleteMaintenanceRequestById(ID).subscribe(allData=>{
          this.GetAllMaintenanceRequests();
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
  this.maintenanceRequestObj.status = E.target.value;
  
}

}
