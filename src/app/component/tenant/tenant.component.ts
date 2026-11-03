import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TenantRepresentation } from '../services/api/module/tenant-representation';
import { TenantService } from '../services/api/tenant/tenant.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent {

  @ViewChild('tenantModal') tenantModal!: TemplateRef<any>;
  private modalRef?: NgbModalRef;

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

  page = 0;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;
  pageSizeOptions = [5, 10, 20];

  constructor(
    private tenantService:TenantService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder,
    private modalService: NgbModal,
    private toast: ToastService
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
              this.modalRef?.close();
              this.page = 0;
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
              this.modalRef?.close();
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
  this.modalRef = this.modalService.open(this.tenantModal, { centered: true, backdrop: 'static' });
  
})
}

GetAllTenants(){
  this.tenantService.GetAllTenants(this.page, this.pageSize).subscribe(allData=>{
    const list = allData?.data?.dataList || [];
    const totalPages = allData?.data?.totalPages || 0;
    if (list.length === 0 && this.page > 0 && this.page >= totalPages) {
      this.page = Math.max(totalPages - 1, 0);
      this.GetAllTenants();
      return;
    }
    this.tenants = list;
    this.page = allData?.data?.page ?? this.page;
    this.totalPages = totalPages;
    this.totalElements = allData?.data?.totalElements || 0;
  })
}

goToPage(nextPage: number): void {
  if (nextPage < 0 || nextPage >= this.totalPages || nextPage === this.page) {
    return;
  }
  this.page = nextPage;
  this.GetAllTenants();
}

changePageSize(event: Event): void {
  const value = Number((event.target as HTMLSelectElement).value);
  this.pageSize = value;
  this.page = 0;
  this.GetAllTenants();
}

get pageNumbers(): number[] {
  return Array.from({ length: this.totalPages }, (_, index) => index);
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


openAddModal(): void{
  this.tenantObj = {};
  this.isEditTenant = false;
  this.modalRef = this.modalService.open(this.tenantModal, { centered: true, backdrop: 'static' });
}

}
