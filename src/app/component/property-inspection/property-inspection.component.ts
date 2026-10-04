import { Component } from '@angular/core';
import { PropertyInspectionRepresentation } from '../services/api/module/property-inspection-representation';
import { PropertyInspectionService } from '../services/api/property-inspection/property-inspection.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';

@Component({
  selector: 'app-propertyInspection',
  templateUrl: './property-inspection.component.html',
  styleUrls: ['./property-inspection.component.scss']
})
export class PropertyInspectionComponent {

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

  constructor(
    private propertyInspectionService:PropertyInspectionService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder
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
  
})
}

GetAllPropertyInspections(){
  this.propertyInspectionService.GetAllPropertyInspections().subscribe(allData=>{
    this.propertyInspections = allData?.data?.dataList || [];
  })
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

}
