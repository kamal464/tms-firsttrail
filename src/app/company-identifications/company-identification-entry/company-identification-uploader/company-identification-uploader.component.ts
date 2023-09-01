import { HttpClient } from '@angular/common/http';
import { Component,OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { UploaderComponent, SelectedEventArgs, FileInfo, RemovingEventArgs } from '@syncfusion/ej2-angular-inputs';
import { API_BASE_URL } from 'src/app/shared/api-config';


@Component({
  selector: 'app-company-identification-uploader',
  templateUrl: './company-identification-uploader.component.html',
  styleUrls: ['./company-identification-uploader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyIdentificationUploaderComponent implements OnInit {
  @ViewChild('fileupload')
  public uploadObj: UploaderComponent;

  public path: Object = {
      saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
      removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
  };

  public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

  public allowExtensions: string = '.doc, .docx, .xls, .xlsx';

 public onSelected(args: SelectedEventArgs): void {
    args.filesData.splice(5);
    let filesData: FileInfo[] = this.uploadObj.getFilesData();
    let allFiles: FileInfo[] = filesData.concat(args.filesData);

    if (allFiles.length > 5) {
        for (let i: number = 0; i < allFiles.length; i++) {
            if (allFiles.length > 5) {
                allFiles.shift();
            }
        }
        args.filesData = allFiles;
        args.modifiedFilesData = args.filesData;
    }
    args.isModified = true;
    
    console.log(allFiles);

    // Prepare the data to send to the API
    const dataToSend = {
        // Construct your data object as needed
        files: allFiles
    };

    // Make the API call
    this.http.post(`${API_BASE_URL}/t/vfs/uploadx`, dataToSend).subscribe(
        (response) => {
            // Handle successful response from the server
            console.log('Data sent to server successfully', response);
        },
        (error) => {
            // Handle error response from the server
            console.error('Error sending data to server', error);
        }
    );
}


  public onFileRemove(args: RemovingEventArgs): void {
      args.postRawFile = false;
  }

  constructor(private http : HttpClient) {
    
  }
  ngOnInit(): void {
  }
}


