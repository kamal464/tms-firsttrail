import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KitUiTextEditComponent } from '../kit-ui-text-edit/kit-ui-text-edit.component';
import { SharedService } from '../shared/shared.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss'],
})
export class CompanyOverviewComponent implements OnInit {
  @ViewChild('KitUiTextEditComponent') childComponent: KitUiTextEditComponent;
  savedData: any=[];
  onSave() {
    this.onpost();
    // this.childComponent.callPostMethod();
    if(this.isvalidtext(this.savedData.name)){
      console.log(`${this.savedData.name} is valid`);
  
    }else {
      console.log(`${this.savedData.name} is invalid`);
    }
   
  }


onpost(){
  this.http.put('http://192.168.0.58:5000/org/updateorg', this.savedData).subscribe();
}

  onDataChanged(data: string) {
    this.savedData = data;
  }

  isvalidtext(text){
    const regex = /^[a-zA-Z]*$/;
    return regex.test(text)
  }
countries : [
  {"label":"ind"},
  {"label":"us"},
  {"label":"aus"}
]

  _currentAction = 'view';
  currentAction = 'view';
  isProcessing = false;
  hasNew = false;
  hasEdit = true;
  companyDetails: '';
  constructor (private sharedService: SharedService,private http : HttpClient){}
  passValue() {
    this.sharedService.setValue(this.savedData);
  }

  doAction(action: any): void {   
    switch (action) {
      case 'edit':
        this.currentAction = action;
        break;
      case 'save':
        break;
      default:
        this.currentAction = 'view';
    }
  }




  ngOnInit(): void {}
}
