import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PropertyInspectionRepresentation } from '../services/api/module/property-inspection-representation';
import { PropertyInspectionService } from '../services/api/property-inspection/property-inspection.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-propertyInspection',
  templateUrl: './property-inspection.component.html',
  styleUrls: ['./property-inspection.component.scss']
})
export class PropertyInspectionComponent {

  @ViewChild('propertyInspectionModal') propertyInspectionModal!: TemplateRef<any>;
  private modalRef?: NgbModalRef;

  propertyInspectionObj:PropertyInspectionRepresentation = {};
  propertyInspections: Array<any> = [];
  allStatus:any;

  type:string;
  statusValue:any;
  isEditPropertyInspection:boolean=false;
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
    private propertyInspectionService:PropertyInspectionService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder,
    private modalService: NgbModal,
    private toast: ToastService
  ){}

  ngOnInit(): void {
    this.isEditPropertyInspection = false;
    this.canCreate = this.permissionHelper.has(AuthIds.AGENT_CREATE);
    this.canUpdate = this.permissionHelper.has(AuthIds.AGENT_UPDATE);
    this.canDelete = this.permissionHelper.has(AuthIds.AGENT_DELETE);
    this.GetAllStatus();
    this.GetAllPropertyInspections();
}


SavePropertyInspection():void{

    this.type = this.isEditPropertyInspection==false?'Add':'Update';
    if(this.type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.propertyInspectionService.createPropertyInspection(this.propertyInspectionObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.modalRef?.close();
              this.page = 0;
              this.GetAllPropertyInspections();
            }
          });
          swal("Sucessfull!", "PropertyInspection has been Adedd!", "success");
        }
       
      });
    }else{
      console.log(this.propertyInspectionObj);
      
      this.propertyInspectionService.createPropertyInspection(this.propertyInspectionObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.modalRef?.close();
              this.GetAllPropertyInspections();  
            }
          });
      swal("Sucessfull!", "PropertyInspection has been updated!", "success");

  
    }

    
}

GetPropertyInspectionById(ID:any){
  this.propertyInspectionService.GetPropertyInspectionsById(ID).subscribe(allData=>{ 
  this.propertyInspectionObj = allData.data.dataList[0];

  this.isEditPropertyInspection = true;
  this.statusValue=allData.data.dataList[0].status.name;
  this.propertyInspectionObj.status = allData.data.dataList[0].status.id;
  this.modalRef = this.modalService.open(this.propertyInspectionModal, { centered: true, backdrop: 'static' });
  
})
}

GetAllPropertyInspections(){
  this.propertyInspectionService.GetAllPropertyInspections(this.page, this.pageSize).subscribe(allData=>{
    const list = allData?.data?.dataList || [];
    const totalPages = allData?.data?.totalPages || 0;
    if (list.length === 0 && this.page > 0 && this.page >= totalPages) {
      this.page = Math.max(totalPages - 1, 0);
      this.GetAllPropertyInspections();
      return;
    }
    this.propertyInspections = list;
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
  this.GetAllPropertyInspections();
}

changePageSize(event: Event): void {
  const value = Number((event.target as HTMLSelectElement).value);
  this.pageSize = value;
  this.page = 0;
  this.GetAllPropertyInspections();
}

get pageNumbers(): number[] {
  return Array.from({ length: this.totalPages }, (_, index) => index);
}

DeleteById(ID:any){

    swal({
      title: "Are you sure",
      text: "That you want to Delete this PropertyInspection?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Order has been deleted!", "success");
        this.propertyInspectionService.DeletePropertyInspectionById(ID).subscribe(allData=>{
          this.GetAllPropertyInspections();
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
  this.propertyInspectionObj.status = E.target.value;
  
}


openAddModal(): void{
  this.propertyInspectionObj = {};
  this.isEditPropertyInspection = false;
  this.modalRef = this.modalService.open(this.propertyInspectionModal, { centered: true, backdrop: 'static' });
}

}
