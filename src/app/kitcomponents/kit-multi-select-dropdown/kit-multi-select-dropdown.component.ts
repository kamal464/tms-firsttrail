import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-kit-multi-select-dropdown',
  templateUrl: './kit-multi-select-dropdown.component.html',
  styleUrls: ['./kit-multi-select-dropdown.component.scss']
})
export class KitMultiSelectDropdownComponent implements OnInit {
  @Input() label: any;
  constructor() { }

  ngOnInit(): void {
  }

}
