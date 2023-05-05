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
  items: string[] = [];
  inputValues: string[] = [];

  addInputValue(value: string) {
    this.inputValues.push(value);
  }
  onSave() {
    console.log(this.inputValues)
    this.onAdd();
    // this.onpost();
    // this.childComponent.callPostMethod();
    console.log(this.items)
    console.log(this.savedData)
   
  }
 
onAdd(){
  this.http.post('http://192.168.0.58:5000/org/addorg',this.inputValues).subscribe();
}
onpost(){
  this.http.put('http://192.168.0.58:5000/org/updateorg', this.inputValues).subscribe();
}

  onDataChanged(data: any) {
    this.savedData = data;
  }
countries : [
  {"label":"ind"},
  {"label":"us"},
  {"label":"aus"}
]

  _currentAction = 'view';
  currentAction = 'view';

  hasNew = false;
  hasEdit = true;
  companyDetails: '';
  constructor ( private http : HttpClient){}
  

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
