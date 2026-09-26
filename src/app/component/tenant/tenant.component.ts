import { Component } from '@angular/core';
import { TenantRepresentation } from '../services/api/module/tenant-representation';
import { TenantService } from '../services/api/tenant/tenant.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent {

  tenantObj:TenantRepresentation = {};
  tenants: Array<any> = [];
  allStatus:any;

  type:string;
  statusValue:any;
  isEditTenant:boolean=false;
  dtDynamicVerticalScrollExample:any;

  canCreate = false;
  canUpdate = false;
  canDelete = false;

  constructor(
    private tenantService:TenantService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.isEditTenant = false;
    this.canCreate = this.permissionHelper.has(AuthIds.TENANT_CREATE);
    this.canUpdate = this.permissionHelper.has(AuthIds.TENANT_UPDATE);
    this.canDelete = this.permissionHelper.has(AuthIds.TENANT_DELETE);
    this.GetAllStatus();
    this.GetAllTenants();
}


SaveTenant():void{

    this.type = this.isEditTenant==false?'Add':'Update';
    if(this.type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.tenantService.createTenant(this.tenantObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllTenants();  
            }
          });
          swal("Sucessfull!", "Tenant has been Adedd!", "success");
        }
       
      });
    }else{
      console.log(this.tenantObj);
      
      this.tenantService.createTenant(this.tenantObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllTenants();  
            }
          });
      swal("Sucessfull!", "Tenant has been updated!", "success");

  
    }

    
}

GetTenantById(ID:any){
  this.tenantService.GetTenantsById(ID).subscribe(allData=>{ 
  this.tenantObj = allData.data.dataList[0];

  this.isEditTenant = true;
  this.statusValue=allData.data.dataList[0].status.name;
  this.tenantObj.status = allData.data.dataList[0].status.id;
  
})
}

GetAllTenants(){
  this.tenantService.GetAllTenants().subscribe(allData=>{
    this.tenants = allData?.data?.dataList || [];
  })
}

DeleteById(ID:any){

    swal({
      title: "Are you sure",
      text: "That you want to Delete this Tenant?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Order has been deleted!", "success");
        this.tenantService.DeleteTenantById(ID).subscribe(allData=>{
          this.GetAllTenants();
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
  this.tenantObj.status = E.target.value;
  
}

}
