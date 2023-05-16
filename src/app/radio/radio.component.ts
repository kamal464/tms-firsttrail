import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  selectedValue: string;
  options = [
    { id: '1', label: 'Kamal' },
    { id: '2', label: 'vishal' },
    { id: '3', label: 'Adi' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
