import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'kit-ui-text-edit',
  templateUrl: './kit-ui-text-edit.component.html',
  styleUrls: ['./kit-ui-text-edit.component.scss'],
})
export class KitUiTextEditComponent implements OnInit {
  @Input() companyname: string;
  @Input() placeHolder: string;
  view: any = [];

  constructor() {}

  ngOnInit(): void {}
}
