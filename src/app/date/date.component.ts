import { Component, OnInit ,Input,Output} from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
@Input() datelabel : string;
@Input() placeHolder : string;

  constructor() { }

  ngOnInit(): void {
  }

}
