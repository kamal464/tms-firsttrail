import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-kit-dropdown',
  templateUrl: './kit-dropdown.component.html',
  styleUrls: ['./kit-dropdown.component.scss'],
})
export class KitDropdownComponent implements OnInit, OnChanges {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() fielddata: any;
  @Input() dropdata: any[];
  @Input() required: boolean = false;
  @Input() textfield: any;
  @Input() valuefield: any;
  @Input() isdropdown:boolean = false;
  @Input() ismultiselect : boolean = false;

  @Output() sendData = new EventEmitter<any>();

  public dropdownControl: FormControl;
  public dropdowndata: any[] = [];
  public localFields: { text: string, value: string } = { text: '', value: '' };
  public localWaterMark: string = 'Select a type';
  public localheight: string = '200px';
  public box : string = 'Box';
  public default : string = 'Default';
  constructor() {
    this.dropdownControl = new FormControl(
      '',
      this.required ? Validators.required : null
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dropdata'] && this.dropdata) {
      this.updateDropdownData();
      this.updateLocalFields();
    }
  }

  ngOnInit(): void {
    if (this.dropdata) {
      this.updateDropdownData();
      this.updateLocalFields();
    }
  }

  private updateDropdownData(): void {
    this.dropdowndata = this.dropdata && this.dropdata.length > 0 ? [...this.dropdata] : [];
    console.log(this.dropdowndata, 'Updated dropdowndata');
  }

  private updateLocalFields(): void {
    if (this.textfield && this.valuefield) {
      this.localFields.text = this.textfield;
      this.localFields.value = this.valuefield;
      console.log(this.localFields, this.label, 'check');
    } else if (this.dropdata && this.dropdata.length > 0 && this.dropdata.some(item => typeof item === 'object' && this.valuefield in item)) {
      this.localFields.text = this.textfield || 'name';
      this.localFields.value = this.valuefield;
    } else {
      this.localFields.text = this.textfield || 'code';
      this.localFields.value = this.valuefield || 'code';
    }
  }

  DataToParent(event: any): void {
    const selectedValue = event.itemData;
    console.log(selectedValue);
    this.sendData.emit(selectedValue);
  }
  multidrop(event: any): void {
    const selectedValue = event.value;
    console.log(selectedValue);
    this.sendData.emit(selectedValue);
  }
}
