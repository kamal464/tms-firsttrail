import { Component, OnInit ,Input,Output} from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  isChecked = true;
  constructor() { }

  ngOnInit(): void {
  }

}
