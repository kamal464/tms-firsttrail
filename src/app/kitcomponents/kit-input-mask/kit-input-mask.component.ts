import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-kit-input-mask',
  templateUrl: './kit-input-mask.component.html',
  styleUrls: ['./kit-input-mask.component.scss']
})
export class KitInputMaskComponent implements OnInit {
  @Input() label: any;
  @Input() placeholder: any;
  @Input() fielddata: any;
  @Input() mask:string;
  @Output() sendData = new EventEmitter<any>();
  constructor() { }


  DataToParent(value:any){
    
    this.sendData.emit(value)
  }

  ngOnInit(): void {
    console.log(this.mask); 
  }

}
