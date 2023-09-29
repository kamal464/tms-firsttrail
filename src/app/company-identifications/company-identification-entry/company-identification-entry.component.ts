import { Component, OnInit ,Input,Output,EventEmitter,ChangeDetectorRef,ChangeDetectionStrategy} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_BASE_URL,Api_Base,vfsApi } from 'src/app/shared/api-config';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base/src/base';
// import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { NgForOf } from '@angular/common';
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
@Input()attachments:any=[];
@Output() onDelete = new EventEmitter<any>();
title:any= '';
table_name = 'identification'
table_id = '';
uploadedbyfkempid = '';
category = 'image';
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
  constructor(private http:HttpClient,
    private fileservice:FileUploadService,
    private ref : ChangeDetectorRef) {
    this.countrydata = this.countrydata.concat(this.countries);
    this.identityType = this.identityType.concat(this.identityTypeDropdown);
    this.identityissudby = this.identityissudby.concat(this.identityIssuedByDropdown);
 console.log(this.countries)
   }

  ngOnInit(): void {
    
    
 this.table_id = this.identificationsInfo.id
 this.uploadedbyfkempid  = this.identificationsInfo.id
 
      this.countrydata = this.countrydata.concat(this.countries);
      this.identityType = this.identityType.concat(this.identityTypeDropdown);
      this.identityissudby = this.identityissudby.concat(this.identityIssuedByDropdown);
   console.log(this.countries)

  }
 
  

  handleInput(inputName: string, inputValue: string): void {
    console.log(inputName,inputValue)
    this.identificationsInfo[inputName] = inputValue;
  }






  _doDelete(): void {
    console.log(this.identificationsInfo.id)
    this.onDelete.emit(this.identificationsInfo.id);
  }

  public countrydata: any = [
    
  ];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'value', value: 'id' };
  // set the height of the popup element
  public height: string = '220px';
  // set the placeholder to DropDownList input element
  public watermark: string = 'Select a country';
  // set the placeholder to filter search box input element
  public filterPlaceholder: string = 'Search';
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
      let query: Query = new Query();
      //frame the query based on search string with filter type.
      query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
      //pass the filter data source, filter query to updateData method.
      e.updateData(this.countrydata, query);
  }
 





  public identityType:any= [];
  public typeFields: Object = { text: 'value', value: 'value' };
    // set the placeholder to DropDownList input element
    public typeWaterMark: string = 'Select a type';
    // set the height of the popup element
    public typeheight: string = '200px';



  public identityissudby:any= [];
  public issudbyFields: Object = { text: 'value', value: 'value' };
    // set the placeholder to DropDownList input element
    public issudbyWatermark: string = 'Select a type';
    // set the height of the popup element
    public issudbyHeight: string = '200px';




  updateIdentification(){
    const formatDateField = (dateValue) => {
      if (!dateValue) {
        return null;
      }
      
      const dateObj = new Date(dateValue);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      
      return `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
    };
    const requestBody = {
      id: this.identificationsInfo.id,
      fkcountrycode:this.identificationsInfo.fkcountrycode,
      type: this.identificationsInfo.type,
      issuedby: this.identificationsInfo.issuedby,
      issuedate: formatDateField(this.identificationsInfo.issuedate),
      number: this.identificationsInfo.number,
      name: this.identificationsInfo.name,
      validfromdate: formatDateField(this.identificationsInfo.validfromdate),
      validuptodate: formatDateField(this.identificationsInfo.validuptodate),
      fkorgid: 1,
      fkempid: null,
    };
    this.http.post(`${API_BASE_URL}/t/identification/update` , requestBody).subscribe((data)=>{
      console.log(data, 'data is updated')
      this.updateUploadVfs(requestBody.id)
    })
  }

  removeAttachment(attachment): void {
console.log(this.identificationsInfo);
    console.log(attachment,'attachment removed')
    if (this.identificationsInfo && this.identificationsInfo.attachment) {
      const index = this.identificationsInfo.attachment.findIndex((entry) => entry.id == attachment.id);
      if (index !== -1) {
        this.identificationsInfo.attachment.splice(index, 1);
      }

      
      this.refreshView();
    }
    
    const headers = new HttpHeaders()
    .set('id', attachment.id.toString());
  
  this.http.post(`${API_BASE_URL}/t/vfs/delete`, {}, { headers }).subscribe(
    (data) => {
      console.log(data, 'vfs deleted');
    },
    (error) => {
      console.error('Error deleting vfs:', error);
    }
  );
  }
  removeSelectedAttachment(idx): void {
    console.log(idx,'index')
    if (this.identificationsInfo && this.identificationsInfo.attachment) {
      this.identificationsInfo.attachment.splice(idx, 1);
    }
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


  updateUploadVfs = (data) => {
    let files = this.fileservice.files || [];
    console.log('upload is called');
  
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }
  
    this.http
      .post(`${vfsApi}/upload`, formData, {
        headers: {
          table_name: 'identification',
          table_id: data.toString(),
          uploadedbyfkempid: '1693465985040',
          // category: 'img',
        },
      })
      .subscribe((responseData) => {
        console.log(responseData, 'uploaded successfully');
        
        // Assuming identificationInfo is an object where you want to store the attachment data
        // Modify this part according to your application's structure
        this.identificationsInfo.attachment = responseData;
      
  
        // You can also perform any other actions you need to after the upload is successful here.
      });
  };

  refreshView(): void {
    setTimeout(() => {
      this.ref.markForCheck();
    }, 200);
  }
  
}
