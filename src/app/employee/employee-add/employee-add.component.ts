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

formData: any = [];
  constructor(private dialog: MatDialog ) {}

  ngOnInit(): void {
  }

  
  doAction(action): void {
    this._currentAction = action;
    console.log(action)
      switch (action) {
        case 'delete':
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          this._currentAction = action;
        this.saveFormData();
         
          break;
        case 'cancel':
          this._currentAction = 'view';

          break;
          case 'new':
          
            this._currentAction = 'new'
            break;
        default:
      }
    }
  saveFormData() {
    console.log('sdfsdfs')
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
