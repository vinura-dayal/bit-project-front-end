import { Component } from '@angular/core';
import { PropertyRepresentation } from '../services/api/module/property-representation';
import { PropertyService } from '../services/api/property/property.service';
import { StatusService } from '../services/api/status/status.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { AuthIds, PermissionHelperService } from '../services/permission-helper.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent {

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

  constructor(
    private propertyService:PropertyService,
    private statusService:StatusService,
    private permissionHelper: PermissionHelperService,
    public fb:FormBuilder
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
  
})
}

GetAllPropertys(){
  this.propertyService.GetAllPropertys().subscribe(allData=>{
    this.propertys = allData?.data?.dataList || [];
  })
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

}
