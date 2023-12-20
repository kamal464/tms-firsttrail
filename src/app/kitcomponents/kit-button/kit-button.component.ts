import { Component,OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
@Component({
  selector: 'app-kit-button',
  templateUrl: './kit-button.component.html',
  styleUrls: ['./kit-button.component.scss']
})
export class KitButtonComponent implements OnInit {

  constructor() { }
  @ViewChild('toggleBtn')
  public toggleBtn: ButtonComponent;
  ngOnInit(): void {
  }

}
