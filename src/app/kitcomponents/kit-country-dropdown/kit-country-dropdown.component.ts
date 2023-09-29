import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { HttpClient } from '@angular/common/http';
import { Api_Base } from 'src/app/shared/api-config';

@Component({
  selector: 'app-kit-country-dropdown',
  templateUrl: './kit-country-dropdown.component.html',
  styleUrls: ['./kit-country-dropdown.component.scss']
})
export class KitCountryDropdownComponent implements OnInit {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() fielddata: any;
  @Output() sendData = new EventEmitter<any>();

  constructor(private http :HttpClient) { 
    
  }

  ngOnInit(): void {
    this.getCountries();
    console.log(this.placeholder,this.label)
    this.watermark = this.placeholder;
    
    
  }




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
 


  DataToParent(event: any) {
    const selectedValue = event.value; // Assuming that the selected value is stored in the 'value' property.
    console.log(selectedValue);
    this.sendData.emit(selectedValue);
  }
  

  getCountries(){
    this.http.post(`${Api_Base}/utils/dropdown/country`,{}).subscribe((data  =>{

  this.countrydata = data

console.log(this.countrydata)
  
  }))
  }




}
