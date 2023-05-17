import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-checkbox',
  templateUrl: './multiple-checkbox.component.html',
  styleUrls: ['./multiple-checkbox.component.scss'],
})
export class MultipleCheckboxComponent implements OnInit {
  options = [
    { id: '1', label: 'Kamal', checked: false },
    { id: '2', label: 'vishal', checked: false },
    { id: '3', label: 'Adi', checked: false },
  ];
  constructor() {}

  ngOnInit(): void {}
}
