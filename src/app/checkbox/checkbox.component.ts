import { Component, OnInit,Input,Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  isChecked = true;
  constructor() { }

  ngOnInit(): void {
  }

}
