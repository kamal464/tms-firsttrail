import { Component, OnInit, ViewChild } from '@angular/core';
import { KitUiTextEditComponent } from 'src/app/kit-ui-text-edit/kit-ui-text-edit.component';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL,Api_Base } from 'src/app/shared/api-config';
import { Query } from '@syncfusion/ej2-data';
// import { EmitType } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base/src/base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'app-customer-overview',
  templateUrl: './customer-overview.component.html',
  styleUrls: ['./customer-overview.component.scss']
})
export class CustomerOverviewComponent implements OnInit {

  @ViewChild('KitUiTextEditComponent') child: KitUiTextEditComponent;
  //  mask:any='000-000-0000';
    savedData: any = [];
    countries : any =[];
    getall:any = [];
    items: string[] = [];
    inputValues: string[] = [];
    getData: any = [];
    formData: any = [];
    _currentAction = 'view';
    currentAction = 'view';
    error: string;
    hasNew = false;
    hasEdit = true;
    companyDetails: '';
    getRecord() {
      this.http
        .post(`${API_BASE_URL}/t/org/getall`, {})
        .subscribe((data: any) => {
          this.getall = data;
          this.formData = data[0];
          console.log(data,this.getall);
         
        });
    }
    handleInput(inputName: string, inputValue: string): void {
      console.log(inputName,inputValue)
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
      console.log(this.inputValues.slice(-1));
      console.log(this.formData);
      // this.onAdd();
     
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
  
  
  
  
    public countrydata: any = [
      
  ];
  public fields: Object = { text: 'value', value: 'id' };
  public height: string = '220px';
  public watermark: string = 'Select a country';
  public filterPlaceholder: string = 'Search';
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
      let query: Query = new Query();
      query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
      e.updateData(this.countrydata, query);
  }
  
  
  
  
  
  
  
  
  
  
  
    onUpdate() {
      console.log(this.formData)
  const requestbody = {
    id : 1,
    code:this.formData.code , 
    name : this.formData.name,
    legalname : this.formData.legalname, 
   fkcountrycode : this.formData.fkcountrycode,
   contactname : this.formData.contactname,
   email:this.formData.email,
   phone: this.formData.phone,
   fax:this.formData.fax,
   website : this.formData.website,
   comments:this.formData.comments,
   whatsapp : this.formData.whatsapp,
   linkedin : this.formData.linkedin,
   type:this.formData.type,
   golivedate:this.formData.golivedate,
  sid: this.formData.sid,
  rss:  this.formData.rss,
  lct : this.formData.lct,
  lmt : this.formData.lmt ,
  sct : this.formData.sct ,
  smt :  this.formData.smt,
  }
  
  console.log(requestbody)
      this.http
        .post(`${API_BASE_URL}/t/org/update`, requestbody)
        .subscribe((data) => {
          console.log(data)
        });
     
    }
    
    onDataChanged(data: any) {
      this.savedData = data;
    }
   
  
    onInputChange(get: any) {
      console.log(get);
      if(get.legalname){
        if (get.legalnamelength < 3) {
          this.error = `legal name must be at least 3 characters long`;
        } else if (!/^[a-zA-Z ]+$/.test(get.legalname)) {
          this.error = 'Legal name must contain only letters and spaces';
        } else {
          this.error = null;
        }
      }
      else if(get.code){
        if (get.code < 3) {
          this.error = 'code must be at least 3 characters long';
        } else if (!/^[a-zA-Z ]+$/.test(get.code)) {
          this.error = 'code must contain only letters and spaces';
        } else {
          this.error = null;
        }
      }
  
  
    }
    
  
    constructor(private http: HttpClient) {}
  
    doAction(action: any): void {
      switch (action) {
        case 'edit':
          this.currentAction = action;
          break;
        case 'save':
          this.currentAction = 'view';
          break;
        default:
          this.currentAction = 'view';
      }
    }
    getCountries(){
      this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data  =>{
    this.countries = data;
    this.countrydata = data
  console.log(this.countries)
  console.log(this.countrydata)
    
    }))
    }
  
  
    ngOnInit(): void {
      this.getRecord();
      this.getCountries();
    }
  }
  