import { Component, OnChanges, OnInit, SimpleChanges,OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeAddSuccessPopupComponent } from './employee-add-success-popup/employee-add-success-popup.component';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
_currentAction = 'new';
private isSaveFormDataCalled = false;
formData: any = [];
  constructor(private dialog: MatDialog , private sharedService : SharedServiceService) {}

  ngOnInit(): void {
  }

  
  doAction(action): void {
    this._currentAction = action;
  
     
      switch (action) {
        case 'delete':
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          if (!this.isSaveFormDataCalled){
          this._currentAction = action;

          this.saveFormData();
          console.log(action);
          this.isSaveFormDataCalled = true;
          } 
          break;
        case 'cancel':
      
        this.sharedService.removeItem('addemployee');
      
          break;
        case 'new':
          this._currentAction = 'new';
          break;
        default:
      
    }
  }
  saveFormData() {
  
    // Perform any additional validation if required before saving the data
    if (this.formData.name && this.formData.email) {
      // Save the data or perform other actions here
      console.log('Form data to save:', this.formData);

      // Open the success popup
      this.dialog.open(EmployeeAddSuccessPopupComponent);
    } else {
      this.dialog.open(EmployeeAddSuccessPopupComponent);
    }
  }

  

}
