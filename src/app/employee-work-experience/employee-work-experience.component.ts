import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { API_BASE_URL ,vfsApi} from '../shared/api-config';
import { FileUploadService } from '../shared/file-upload.service';
@Component({
  selector: 'app-employee-work-experience',
  templateUrl: './employee-work-experience.component.html',
  styleUrls: ['./employee-work-experience.component.scss']
})
export class EmployeeWorkExperienceComponent implements OnInit {
  _currentAction = 'view';
  _editIndex:  number = -1;
  hasEdit:any = false;
  isProcessing = false;
  _selectedAttachments = [];
  workExperienceArray:any=[];
  constructor(private http : HttpClient,private fileservice:FileUploadService ) { }

  ngOnInit(): void {
    this.getWorkHistory();
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


getWorkHistory(){
  this.http.post(`${API_BASE_URL}/t/empworkhistory/getall`,{}).subscribe((data)=>{
    console.log(data)
    this.workExperienceArray = data;
    this.workExperienceArray.forEach((identificationInfo) => {
      const workId = identificationInfo.id;
      this.getAttachments(workId);
      console.log(this.workExperienceArray)
    });
  })

}
private workhistoryDataMap: Record<string, any> = {};
getAttachments(Id) {
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('filtername', 'fkempworkhistoryid')
    .set('filtervalue', Id.toString());

  this.http.post(`${API_BASE_URL}/t/vfs/getall`, {}, { headers }).subscribe((data) => {
    console.log(data, 'getattachments');
    
    // Store attachments data in the map using the identificationId as the key
    this.workhistoryDataMap[Id] = data;

    // Check if there is matching data in the map for each identificationInfo
    this.workExperienceArray.forEach((workhistory) => {
      const workhistoryId = workhistory.id;

      if (this.workhistoryDataMap.hasOwnProperty(workhistoryId)) {
        // Merge the data into the identificationInfo object
        workhistory.attachments = this.workhistoryDataMap[workhistoryId];
      }
    });
    
    console.log(this.workExperienceArray.attachments);
  });
}


removeAttachment(attachment): void {
  console.log(this.workExperienceArray);
      console.log(attachment,'attachment removed')
      if (this.workExperienceArray && this.workExperienceArray.attachment) {
        const index = this.workExperienceArray.attachment.findIndex((entry) => entry.id == attachment.id);
        if (index !== -1) {
          this.workExperienceArray.attachment.splice(index, 1);
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


updateWorkExperience(item){
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
    id:item.id,
    fkempid:item.fkempid,
    employer:item.employer,
    designation:item.designation,
    roles:item.roles,
    fromdate:formatDateField(item.fromdate),
    todate:formatDateField(item.todate),
    isrelevant:null,
    reviewedbyfkempid:null,
    reviewdate:null,
    remarks:item.remarks,
    isactive:0
  }
  this.http.post(`${API_BASE_URL}/t/empworkhistory/update`,requestBody).subscribe((data)=>{
    console.log(data)
    this.uploadVfs(requestBody.id)
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
        table_name: 'empworkhistory',
        table_id: data.toString(),
        uploadedbyfkempid: '1693465985040',
        // category: 'img',
      },
    })
    .subscribe((responseData) => {
      console.log(responseData, 'uploaded successfully');
      
      // Assuming identificationInfo is an object where you want to store the attachment data
      // Modify this part according to your application's structure
      this.workExperienceArray.attachment = responseData;
     
      // You can also perform any other actions you need to after the upload is successful here.
    });
};



doDelete(id){
  this.deleteWorkExperience(id);
      }

      deleteWorkExperience(id: number) {
        const combinedObject = this.workExperienceArray.find((item) => item.id === id);
      console.log(id)
        if (combinedObject) {
          const addressId = combinedObject.id;
          console.log(addressId);
          const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('id', addressId.toString());
    
      
          this.http.post(`${API_BASE_URL}/t/empworkhistory/delete`, {}, { headers }).subscribe(
            (data) => {
              console.log('workhistory is deleted', addressId);
              this.workExperienceArray = this.workExperienceArray.filter((item) => item.id !== addressId );
            }
            );
        }
      }



      

}
