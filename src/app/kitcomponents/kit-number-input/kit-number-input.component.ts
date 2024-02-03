import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
declare var require: any;
loadCldr(
  require('cldr-data/main/de/numbers.json'),
  require('cldr-data/main/de/currencies.json'),
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/supplemental/currencyData.json')
);
@Component({
  selector: 'app-kit-number-input',
  templateUrl: './kit-number-input.component.html',
  styleUrls: ['./kit-number-input.component.scss']
})
export class KitNumberInputComponent implements OnInit {
  @Input() label: any;
  @Input()amount:boolean = false;
  @Input()decimal:boolean = false;
  @Input() placeholder: any;
  @Input() value:number;
  @Input() currency: string='INR';
  @Input() format:string;
  @Input() step:any;
  @Output() sendData = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    L10n.load({
      'de': {
      'numerictextbox': {
              incrementTitle: 'Wert erhöhen', decrementTitle: 'Dekrementwert'
          }
     }
  });
  }
  DataToParent(value:any){
   
    
    this.sendData.emit(value)
  }
}
