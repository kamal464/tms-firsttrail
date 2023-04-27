import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'kit-ui-text-edit',
  templateUrl: './kit-ui-text-edit.component.html',
  styleUrls: ['./kit-ui-text-edit.component.scss']
})
export class KitUiTextEditComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() formControlName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
