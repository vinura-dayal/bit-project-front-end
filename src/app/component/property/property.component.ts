import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PropertyRepresentation } from '../services/api/module/property-representation';
import { PropertyService } from '../services/api/property/property.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent {

  @ViewChild('propertyModal') propertyModal!: TemplateRef<any>;
  private modalRef?: NgbModalRef;

  propertyObj:PropertyRepresentation = {};
  propertys: Array<any> = [];
  allStatus:any;

  type:string;
  statusValue:any;
  isEditProperty:boolean=false;
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
    private propertyService:PropertyService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder,
    private modalService: NgbModal,
    private toast: ToastService
  ){}

  ngOnInit(): void {
    this.isEditProperty = false;
    this.canCreate = this.permissionHelper.has(AuthIds.LANDLORD_CREATE);
    this.canUpdate = this.permissionHelper.has(AuthIds.LANDLORD_UPDATE);
    this.canDelete = this.permissionHelper.has(AuthIds.LANDLORD_DELETE);
    this.GetAllStatus();
    this.GetAllPropertys();
}


SaveProperty():void{

    this.type = this.isEditProperty==false?'Add':'Update';
    if(this.type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.propertyService.createProperty(this.propertyObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.modalRef?.close();
              this.page = 0;
              this.GetAllPropertys();
            }
          });
          swal("Sucessfull!", "Property has been Adedd!", "success");
        }
       
      });
    }else{
      console.log(this.propertyObj);
      
      this.propertyService.createProperty(this.propertyObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.modalRef?.close();
              this.GetAllPropertys();  
            }
          });
      swal("Sucessfull!", "Property has been updated!", "success");

  
    }

    
}

GetPropertyById(ID:any){
  this.propertyService.GetPropertysById(ID).subscribe(allData=>{ 
  this.propertyObj = allData.data.dataList[0];

  this.isEditProperty = true;
  this.statusValue=allData.data.dataList[0].status.name;
  this.propertyObj.status = allData.data.dataList[0].status.id;
  this.modalRef = this.modalService.open(this.propertyModal, { centered: true, backdrop: 'static' });
  
})
}

GetAllPropertys(){
  this.propertyService.GetAllPropertys(this.page, this.pageSize).subscribe(allData=>{
    const list = allData?.data?.dataList || [];
    const totalPages = allData?.data?.totalPages || 0;
    if (list.length === 0 && this.page > 0 && this.page >= totalPages) {
      this.page = Math.max(totalPages - 1, 0);
      this.GetAllPropertys();
      return;
    }
    this.propertys = list;
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
  this.GetAllPropertys();
}

changePageSize(event: Event): void {
  const value = Number((event.target as HTMLSelectElement).value);
  this.pageSize = value;
  this.page = 0;
  this.GetAllPropertys();
}

get pageNumbers(): number[] {
  return Array.from({ length: this.totalPages }, (_, index) => index);
}

DeleteById(ID:any){

    swal({
      title: "Are you sure",
      text: "That you want to Delete this Property?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Order has been deleted!", "success");
        this.propertyService.DeletePropertyById(ID).subscribe(allData=>{
          this.GetAllPropertys();
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
  this.propertyObj.status = E.target.value;
  
}


openAddModal(): void{
  this.propertyObj = {};
  this.isEditProperty = false;
  this.modalRef = this.modalService.open(this.propertyModal, { centered: true, backdrop: 'static' });
}

}
