import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-identifications',
  templateUrl: './company-identifications.component.html',
  styleUrls: ['./company-identifications.component.scss']
})
export class CompanyIdentificationsComponent implements OnInit {
  _identificationsInfo: any = [];
  isNew = false;
  constructor() { }

  ngOnInit(): void {
  }

}
