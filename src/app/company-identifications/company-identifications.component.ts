import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Api_Base, API_BASE_URL, vfsApi } from '../shared/api-config';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Query } from '@syncfusion/ej2-data';
// import { EmitType } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base/src/base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { CompanyIdentificationUploaderComponent } from './company-identification-entry/company-identification-uploader/company-identification-uploader.component';
import { FileUploadService } from '../shared/file-upload.service';
import { CompanyIdentificationEntryComponent } from './company-identification-entry/company-identification-entry.component';
@Component({
  selector: 'app-company-identifications',
  templateUrl: './company-identifications.component.html',
  styleUrls: ['./company-identifications.component.scss'],
})
export class CompanyIdentificationsComponent implements OnInit {
  @ViewChild(CompanyIdentificationEntryComponent) entrycomponent : CompanyIdentificationEntryComponent;
  @ViewChild(CompanyIdentificationUploaderComponent)
  childComponent: CompanyIdentificationUploaderComponent;
  table_name = 'identification';
  table_id = '';
  uploadedbyfkempid = '';
  category = 'image';
  identificationsInfo: any = [];
  identityTypeDropdown: any;
  identityIssuedByDropdown: any;
  countries: any;
  isNew = false;
  selectedCountry: string;
  _attachments: any=[];
  _selectedAttachments: any;
  _currentAction = 'view';
  isProcessing = false;
  idType: any;
  idIssuedBy: any;
  idIssuedDate: any;
  idNumber: any;
  idName: any;
  idValidFromDate: any;
  idValidUptoDate: any;
  identificationId:any;
  _identifications:any;
  sendBody:any;
  constructor(
    private http: HttpClient,
    private fileservice: FileUploadService
  ) {}

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.idIssuedDate = event.value;
  }

  ngOnInit(): void {
    
    this.getIdentifications();
    this.getIdentityType();
    this.getIssuedBy();
    this.getCountries();
  }


  handleInput(inputName: string, inputValue: string): void {
    console.log(inputName,inputValue)
    this.sendBody = {
      ...this.sendBody,
      [inputName]:inputValue
    }
  }
  public countrydata: any = [];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'value', value: 'id' };
  // set the height of the popup element
  public height: string = '220px';
  // set the placeholder to DropDownList input element
  public watermark: string = 'Select a country';
  // set the placeholder to filter search box input element
  public filterPlaceholder: string = 'Search';
  // filtering event handler to filter a Country
  public onFiltering: EmitType<FilteringEventArgs> = (
    e: FilteringEventArgs
  ) => {
    let query: Query = new Query();
    //frame the query based on search string with filter type.
    query =
      e.text !== '' ? query.where('Name', 'startswith', e.text, true) : query;
    //pass the filter data source, filter query to updateData method.
    e.updateData(this.countrydata, query);
  };

  public identityType: any = [];
  public typeFields: Object = { text: 'value', value: 'value' };
  // set the placeholder to DropDownList input element
  public typeWaterMark: string = 'Select a type';
  // set the height of the popup element
  public typeheight: string = '200px';

  public identityissudby: any = [];
  public issudbyFields: Object = { text: 'value', value: 'value' };
  // set the placeholder to DropDownList input element
  public issudbyWatermark: string = 'Select a type';
  // set the height of the popup element
  public issudbyHeight: string = '200px';

  getCountries() {
    this.http
      .post(`${Api_Base}/utils/dropdown/country`, {})
      .subscribe((data) => {
        console.log(data);
        this.countries = data;
        this.countrydata = data;
      });
  }

  getIdentifications() {
    this.http
      .post(`${API_BASE_URL}/t/identification/getall`, {})
      .subscribe((data) => {
        this.identificationsInfo = data;
        console.log('identifications fetched', data);
        
        // Iterate through each identificationInfo and call getAttachments
        this.identificationsInfo.forEach((identificationInfo) => {
          const identificationId = identificationInfo.id;
          this.getAttachments(identificationId);
          console.log(this.identificationsInfo)
        });
      });
  }
  
  


private attachmentsDataMap: Record<string, any> = {}; // Map to store attachments data

getAttachments(Id) {
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('filtername', 'fkidentificationid')
    .set('filtervalue', Id.toString());

  this.http.post(`${API_BASE_URL}/t/vfs/getall`, {}, { headers }).subscribe((data) => {
    console.log(data, 'getattachments');
    
    // Store attachments data in the map using the identificationId as the key
    this.attachmentsDataMap[Id] = data;

    // Check if there is matching data in the map for each identificationInfo
    this.identificationsInfo.forEach((identificationInfo) => {
      const identificationId = identificationInfo.id;

      if (this.attachmentsDataMap.hasOwnProperty(identificationId)) {
        // Merge the data into the identificationInfo object
        identificationInfo.attachments = this.attachmentsDataMap[identificationId];
      }
    });
    
    console.log(this.identificationsInfo);
  });
}




  getIdentityType() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkreasonid')
      .set('filtervalue', '1689932317339');

    this.http
      .post(`${API_BASE_URL}/t/reasonitem/getall`, {}, { headers })
      .subscribe((data) => {
        this.identityTypeDropdown = data;
        this.identityType = data;
        console.log(this.identityTypeDropdown);
      });
  }
  getIssuedBy() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('filtername', 'fkreasonid')
      .set('filtervalue', '1689932687534');

    this.http
      .post(`${API_BASE_URL}/t/reasonitem/getall`, {}, { headers })
      .subscribe((data) => {
        this.identityIssuedByDropdown = data;
        this.identityissudby = data;
        console.log(this.identityIssuedByDropdown);
      });
  }




  // Create a new HttpHeaders object to set custom headers
    // let headers = new HttpHeaders();

    // // Append the headers
    // headers = headers.set('table_name', 'identification');
    // headers = headers.set('table_id', data.id.toString());
    // headers = headers.set('uploadedbyfkempid', data.id.toString());
    // headers = headers.set('category', 'img');

    // Make the HTTP POST request with the custom headers and files as FormData
    uploadVfs = (data) => {
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
            table_id: data.id.toString(),
            uploadedbyfkempid: '1693465985040',
            // category: 'img',
          },
        })
        .subscribe((responseData) => {
          console.log(responseData, 'uploaded successfully');
          
          // Assuming identificationInfo is an object where you want to store the attachment data
          // Modify this part according to your application's structure
          this.identificationsInfo.attachment = responseData;
         this.getIdentifications()
    
          // You can also perform any other actions you need to after the upload is successful here.
        });
    };
    

  addIdentity() {
    const timestamp = new Date().getTime();
    this.table_id = timestamp.toString();
    const formatDateField = (dateValue) => {
      if (!dateValue) {
        return null;
      }

      const dateObj = new Date(dateValue);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();

      return `${year}${month < 10 ? '0' : ''}${month}${
        day < 10 ? '0' : ''
      }${day}`;
    };
    const requestBody = {
      id: timestamp,
      type: this.sendBody.type,
      issuedby: this.sendBody.issuedby || null,
      issuedate: formatDateField(this.sendBody.issuedate),
      number: this.sendBody.number || null,
      name: this.sendBody.name || null,
      validfromdate: formatDateField(this.sendBody.validfromdate),
      validuptodate: formatDateField(this.sendBody.validuptodate),
      fkcountrycode: this.sendBody.fkcountrycode || null,
      fkorgid: 1,
      fkempid: null,
      sid: 0,
      rss: 0,
      ict: 0,
      lmt: 0,
      sct: 0,
      smt: 0,
    };



    console.log(requestBody);

    const thisRef = this.childComponent;
    this.http
      .post(`${API_BASE_URL}/t/identification/add`, requestBody)
      .subscribe((data) => {
        console.log('identity is added', data);
        this.identificationsInfo.push(data);

        console.log(this.fileservice.files, 'dddd');
        this.uploadVfs(data);
      });
  }

  doAction(action): void {
    this._currentAction = action;
    switch (action) {
      case 'delete':
        break;
      case 'edit':
        this._currentAction = action;

        break;
      case 'save':
        break;
      case 'cancel':
        break;
      default:
    }
  }
  deleteIdentity(deleteid: number) {
    const deletefield = this.identificationsInfo.find(
      (item) => item.id === deleteid
    );
    console.log(deletefield);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('id', deletefield.id.toString());

    this.http
      .post(`${API_BASE_URL}/t/identification/delete`, {}, { headers })
      .subscribe((data) => {
        console.log('identity is deleted', data);
        this.identificationsInfo.pop(data);
      });
  }
}
