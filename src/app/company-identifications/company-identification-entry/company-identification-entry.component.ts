import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL,Api_Base } from 'src/app/shared/api-config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-company-identification-entry',
  templateUrl: './company-identification-entry.component.html',
  styleUrls: ['./company-identification-entry.component.scss']
})
export class CompanyIdentificationEntryComponent implements OnInit {
@Input()identificationsInfo : any=[];
@Input()identityTypeDropdown : any=[];
@Input()identityIssuedByDropdown : any=[];
@Input()countries :any=[];
@Output() onDelete = new EventEmitter<any>();
  _currentAction = 'view';
  _identificationTitle = '';
  selectedCountry:string;
  errorMsg = '';
  isProcessing = false;
  _identificationTypes = [];
  _identificationIssuedBy = [];
  _attachments = [];
  _selectedAttachments = [];
  _removedAttachments = [];
 idissueDate:any
 idFromDate:any;
 idValidUpto:any;
  constructor(private http:HttpClient) {
    
   }

  ngOnInit(): void {
  }
 
  _doDelete(): void {
    console.log(this.identificationsInfo.id)
    this.onDelete.emit(this.identificationsInfo.id);
  }


  // const issueDate = this.idissueDate;
  //   const validFromDate = this.idFromDate;
  //   const validUpToDate = this.idValidUpto;
  updateIdentification(){
  
    const requestBody = {
      id: this.identificationsInfo.id,
      fkcountrycode:this.selectedCountry,
      type: this.identificationsInfo.type,
      issuedby: this.identificationsInfo.issuedby,
      issuedate: new Date(this.idissueDate).getTime(),
      number: this.identificationsInfo.number,
      name: this.identificationsInfo.name,
      validfromdate: new Date(this.idFromDate).getTime(),
      validuptodate: new Date(this.idValidUpto).getTime(),
      fkorgid: 1,
      fkempid: null,
    };
    this.http.post(`${API_BASE_URL}/t/identification/update` , requestBody).subscribe((data)=>{
      console.log(data, 'data is updated')
    })
  }


  doAction(action): void {
    this._currentAction = action;
    this.errorMsg = '';
    switch (action) {
      case 'delete':
        this. _doDelete();
        break;
      case 'edit':
        this._currentAction = action;
        break;
      case 'save':
        this.updateIdentification();
        this._currentAction = 'view'; 
        break;
      case 'cancel':
        this._currentAction = 'view';
        break;
      default:
        
    }
  
  }
}
