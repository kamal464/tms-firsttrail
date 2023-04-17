import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-offices',
  templateUrl: './company-offices.component.html',
  styleUrls: ['./company-offices.component.scss']
})
export class CompanyOfficesComponent implements OnInit {

  _officesInfo: any = [];
  isNew = false;
  _officesEditSet= "";
  constructor() { }

  ngOnInit(): void {
  }

}
