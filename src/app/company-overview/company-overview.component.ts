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
  @ViewChild('KitUiTextEditComponent') child: KitUiTextEditComponent;
  savedData: any=[];
  items: string[] = [];
  inputValues: string[] = [];
  getData : any=[];
  formData : any = [];
  // formData : any = {
  //   id:this.getData.id,
  //   name: this.getData.name,
  //   shortname: this.getData.shortname,
  //   displayname: '',
  //   fkcountrycode: this.getData.fkcountrycode,
  //   phone: this.getData.phone,
  //   email: this.getData.email,
  //   fax: this.getData.fax,
  //   website: this.getData.website,
  //   whatsapp: this.getData.whatsapp,
  //   linkedin: this.getData.linkedin,
  //   comments: this.getData.comments,
    
  // };
  getRecord(id: string) {
    this.http.post('http://192.168.0.58:5000/org/getorg',{}).subscribe((data: any) => {
      this.formData = {
        id: data.id,
        name: data.name,
        shortname: data.shortname,
        displayname: data.displayname,
        fkcountrycode: data.fkcountrycode,
        phone: data.phone,
        email: data.email,
        fax: data.fax,
        website: data.website,
        whatsapp: data.whatsapp,
        linkedin: data.linkedin,
        comments: data.comments,
      };
    });
  }
  handleInput(inputName: string, inputValue: string): void {
    this.formData[inputName] = inputValue;
  }

  onAddData(data: string) {
    // Call your post method here and pass the data to it
    console.log(data);
  }
  addInputValue(value: string) {
    this.inputValues.push(value);
  }
  onSave() {
    console.log(this.inputValues.slice(-1))
    console.log(this.formData)
    // this.onAdd();
    this.onpost();
    // this.childComponent.callPostMethod();
    // console.log(this.items)
    // console.log(this.savedData)
   
  }

  // getRecord(){
  //   this.http.post('http://192.168.0.58:5000/org/getorg',{}).subscribe((data =>{ console.log(data)
  // this.getData = data;
  // console.log(this.getData)
  // console.log(this.formData)

  
  // }))
  // }
 
onAdd(){
  const array = this.inputValues.slice(-1);
  // const myObject =  {name:array}
  const myJSON = JSON.stringify(array);
  this.http.post('http://192.168.0.58:5000/org/addorg',this.formData).subscribe();
  console.log(myJSON)

}
onpost(){
  const array = this.inputValues.slice(-1);
  const myObject =  {name:array}
  const myJSON = JSON.stringify(myObject);
  console.log(myJSON)
  console.log(this.formData.id)
  this.http.put('http://192.168.0.58:5000/org/updateorg',this.formData).subscribe();
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




  ngOnInit(): void {
    this.getRecord('1683532683');
  }

}
