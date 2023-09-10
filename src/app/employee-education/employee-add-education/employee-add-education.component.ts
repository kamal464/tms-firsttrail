import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { API_BASE_URL,vfsApi } from 'src/app/shared/api-config';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-employee-add-education',
  templateUrl: './employee-add-education.component.html',
  styleUrls: ['./employee-add-education.component.scss']
})
export class EmployeeAddEducationComponent implements OnInit {
  private subscription: Subscription;
  @Input() _currentAction = 'new';
  @Input() empEducationArray :any =[];
  @Output() onAction = new EventEmitter<any>();
  
  employeeId :any ;
  empCourse:any;
  empInstitute:any;
  empSpecialization:any;
  empFromDate:any;
  empToDate:any;
  empScore:any;
  empScoreMax:any;
  empScoreMetric:any;
  empScoreType:any;
  empRemarks:any;
  empIsactive:any;
  isSaveFormDataCalled= false;

  constructor(private http:HttpClient,
    private fileservice :FileUploadService, private sharedService:SharedServiceService) { }

  ngOnInit(): void {
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


  doAction(action): void {
    this._currentAction = action;
    console.log(action)
      switch (action) {
        case 'delete':
          break;
        case 'edit':
          this._currentAction = action;
          break;
        case 'save':
          
          if (!this.isSaveFormDataCalled){
            this.isSaveFormDataCalled = true;
           
         this.addEmpEducation();
          this._currentAction = 'view';
          this.onAction.emit(action);
          }
          break;
        case 'cancel':
          this._currentAction = 'view';
          this.onAction.emit(action);
          break;
        default:
      }
    }


    addEmpEducation(){
      const timestamp = new Date().getTime(); 
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
        id: timestamp,
        fkempid: this.employeeId,
        course: this.empCourse,
        institute: this.empInstitute,
        specialization: this.empSpecialization,
        fromDate: formatDateField(this.empFromDate),
        toDate: formatDateField(this.empToDate),
        score: this.empScore,
        scoremax: this.empScoreMax,
        scoremetric: this.empScoreMetric,
        type: this.empScoreType,
        remarks: this.empRemarks,
        isactive: 0,
        reviewedbyfkempid: null,
        reviewdate: null
      }

      this.http.post(`${API_BASE_URL}/t/empeducation/add` , requestBody).subscribe((data)=>{
        console.log(data,'data')
this.empEducationArray.push(data);
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
          this.empEducationArray.attachment = responseData;
         
          // You can also perform any other actions you need to after the upload is successful here.
        });
    };











  }

