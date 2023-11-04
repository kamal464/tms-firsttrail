import { Component, OnInit ,Input,Output,EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-kit-dropdown',
  templateUrl: './kit-dropdown.component.html',
  styleUrls: ['./kit-dropdown.component.scss']
})
export class KitDropdownComponent implements OnInit,OnChanges {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() fielddata: any;
  @Input() dropdata:any;
  @Input() required: boolean = false;

  @Output() sendData = new EventEmitter<any>();

  constructor() {

   }
   public dropdownControl: FormControl;

  

   ngOnChanges(changes: SimpleChanges): void {
   
    console.log(this.dropdata,'hfgjjhgg')
    this.dropdowndata = this.dropdowndata.concat(this.dropdata);
  //   console.log(this.dropdata);
  
  //   if (Array.isArray(this.dropdowndata) && Array.isArray(this.dropdata)) {
  //     // Filter out undefined values from this.dropdata
  //     const filteredDropdata = this.dropdata.filter(item => item !== undefined);
  //     this.dropdowndata = this.dropdowndata.concat(filteredDropdata);
  
  //     // Check if any item in dropdowndata has a 'value' property
  //     if (this.dropdowndata.some(item => typeof item === 'object' && 'value' in item)) {
  //       this.localFields['text'] = 'value';
  //     console.log(this.localFields)
  //       console.log(this.dropdowndata);
  //     } else {
  //       this.localFields['text'] = 'code'; // Set to 'code' if no 'value' property found
  //     }
  //   } else {
  //     console.error('dropdowndata is not a valid array.');
  //   }
  }
  

   ngOnInit(): void {
    // console.log(this.dropdata,'hfgjjhgg')
    // this.dropdowndata = this.dropdowndata.concat(this.dropdata);
    // if (Array.isArray(this.dropdowndata) && Array.isArray(this.dropdata)) {
    //   // Filter out undefined values from this.dropdata
    //   const filteredDropdata = this.dropdata.filter(item => item !== undefined);
    //   this.dropdowndata = this.dropdowndata.concat(filteredDropdata);
  
    //   // Check if any item in dropdowndata has a 'value' property
    //   if (this.dropdowndata.some(item => typeof item === 'object' && 'value' in item)) {
    //     this.localFields['text'] = 'value';
    //   console.log(this.localFields)
    //     console.log(this.dropdowndata);
    //   } 
    //   else {
    //     this.localFields['text'] = 'code'; // Set to 'code' if no 'value' property found
    //   }
    // } else {
    //   console.error('dropdowndata is not a valid array.');
    // }
    // console.log(this.label, this.placeholder, this.fielddata);
    // this.localWaterMark = this.placeholder;
    // console.log(this.dropdata);
    // this.dropdownControl = new FormControl('', this.required ? Validators.required : null);
  
   
    // if (Array.isArray(this.dropdowndata)) {
    //   this.dropdowndata = this.dropdowndata.concat(this.dropdata);
  
    //   this.localFields['text'] = 'code';
  
    
    //   if (this.dropdowndata.some(item => typeof item === 'object' && 'value' in item)) {
    //     this.localFields['text'] = 'value';
    //     console.log(true);
    //   }
    // } else {
    //   console.error('dropdowndata is not a valid array.');
    // }
  }
  


  DataToParent(event: any) {
    const selectedValue = event.value;
    console.log(selectedValue);
    this.sendData.emit(selectedValue);
  }
   
  public dropdowndata:any= [];
  public localFields: Object = { text: 'value', value: 'id' };
  public localWaterMark: string = 'Select a type';
  public localheight: string = '200px';




}
