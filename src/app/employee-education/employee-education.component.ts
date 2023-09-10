import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_BASE_URL,vfsApi } from '../shared/api-config';
import { Subscription } from 'rxjs';
import { SharedServiceService } from '../shared/shared-service.service';
import { FileUploadService } from '../shared/file-upload.service';

@Component({
  selector: 'app-employee-education',
  templateUrl: './employee-education.component.html',
  styleUrls: ['./employee-education.component.scss']
})
export class EmployeeEducationComponent implements OnInit {
  _currentAction = 'view';
  _editIndex:  number = -1;
  hasEdit:any = false;
  isProcessing = false;
  educationArray:any=[];
  _selectedAttachments:any=[];
  employeeId:any;
  constructor(private http :HttpClient,
   private fileservice : FileUploadService,  private sharedService:SharedServiceService) { }
  private subscription : Subscription
  ngOnInit(): void {
    this.getEducation();
    this.subscription = this.sharedService.employeeId$.subscribe((empid) => {
      this.employeeId = empid;
      if (this.employeeId) {
        console.log('Employee ID in Component B:', this.employeeId);
        // You can perform further actions with the employee ID here
      } else {
        console.log('Employee ID not set in Component B');
      }
    });
  }

  startEdit(index: number) {
    this._editIndex = index;
    this.hasEdit = true;
  }



  doAction(action): void {
    this._currentAction = action;
    console.log(action)
      switch (action) {
        case 'new':
      this._currentAction = action;
      
      break;
        case 'delete':
          this._currentAction = 'view';
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          this._currentAction = 'view';
          this._editIndex = -1;
          break;
        case 'cancel':
          this._currentAction = 'view';
          this._editIndex = -1;
          break;
        default:
      }
    }

getEducation(){
  this.http.post(`${API_BASE_URL}/t/empeducation/getall`,{}).subscribe((data)=>{
    console.log(data,'data is fetched');
    this.educationArray = data;
    this.educationArray.forEach((education) => {
      const eduId = education.id;
      this.getAttachments(eduId);
      console.log(this.educationArray)
    });
  })
}

private educationDataMap: Record<string, any> = {};
getAttachments(Id) {
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('filtername', 'fkempeducationid')
    .set('filtervalue', Id.toString());

  this.http.post(`${API_BASE_URL}/t/vfs/getall`, {}, { headers }).subscribe((data) => {
    console.log(data, 'getattachments');
    
    // Store attachments data in the map using the identificationId as the key
    this.educationDataMap[Id] = data;

    // Check if there is matching data in the map for each identificationInfo
    this.educationArray.forEach((education) => {
      const educationId = education.id;

      if (this.educationDataMap.hasOwnProperty(educationId)) {
        // Merge the data into the identificationInfo object
        education.attachments = this.educationDataMap[educationId];
      }
    });
    
    console.log(this.educationArray.attachments);
  });
}


updateEducation(item){
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
  const requestBody ={
    id: item.id,
    fkempid: this.employeeId,
    course: item.course,
    institute: item.institute,
    specialization: item.specialization,
    fromDate: formatDateField(item.fromDate),
    toDate: formatDateField(item.toDate),
    score: item.score,
    scoremax: item.scoremax,
    scoremetric: item.scoremetric,
    type: item.type,
    remarks: item.remarks,
    isactive: 0,
    reviewedbyfkempid: null,
    reviewdate: null
  }

  this.http.post(`${API_BASE_URL}/t/empeducation/update`,requestBody).subscribe((data)=>{
    console.log(data)
    this.uploadVfs(data)
  })
}
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
        table_name: 'empeducation',
        table_id: data.id.toString(),
        uploadedbyfkempid: '1693465985040',
        // category: 'img',
      },
    })
    .subscribe((responseData) => {
      console.log(responseData, 'uploaded successfully');
      
      // Assuming identificationInfo is an object where you want to store the attachment data
      // Modify this part according to your application's structure
      this.educationArray.attachment = responseData;
     
      // You can also perform any other actions you need to after the upload is successful here.
    });
};

removeAttachment(attachment): void {
  console.log(this.educationArray);
      console.log(attachment,'attachment removed')
      if (this.educationArray && this.educationArray.attachment) {
        const index = this.educationArray.attachment.findIndex((entry) => entry.id == attachment.id);
        if (index !== -1) {
          this.educationArray.attachment.splice(index, 1);
        }  
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
doDelete(id){
  this.deleteEducation(id);
      }

      deleteEducation(id: number) {
        const combinedObject = this.educationArray.find((item) => item.id === id);
      console.log(id)
        if (combinedObject) {
          const addressId = combinedObject.id;
          console.log(addressId);
          const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('id', addressId.toString());
    
      
          this.http.post(`${API_BASE_URL}/t/empeducation/delete`, {}, { headers }).subscribe(
            (data) => {
              console.log('workhistory is deleted', addressId);
              this.educationArray = this.educationArray.filter((item) => item.id !== addressId );
            }
            );
        }
      }





}
