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
    this.onDelete.emit(this.identificationsInfo.office.id);
  }



  updateIdentification(){
    const issueDate = this.idissueDate;
    const validFromDate = this.idFromDate;
    const validUpToDate = this.idValidUpto;
    const requestBody = {
      id:this.identificationsInfo.id,
      type:this.identificationsInfo.type,
      issuedby:this.identificationsInfo.issuedby,
      issuedate:issueDate.getTime(),
      number:this.identificationsInfo.number,
      name:this.identificationsInfo.name,
      validfromdate:validFromDate.getTime(),
      validuptodate:validUpToDate.getTime(),
      fkcountrycode:'d',
      fkorgid:1,
      fkempid:null
      
    }
    this.http.post(`${API_BASE_URL}/t/identification/update` , requestBody).subscribe((data)=>{
      console.log(data, 'data is updated')
    })
  }


  doAction(action): void {
    this._currentAction = action;
    this.errorMsg = '';
    switch (action) {
      case 'delete':
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
