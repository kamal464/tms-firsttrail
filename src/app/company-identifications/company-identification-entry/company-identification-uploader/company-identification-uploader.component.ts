import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import {
  UploaderComponent,
  SelectedEventArgs,
  FileInfo,
  RemovingEventArgs,
} from '@syncfusion/ej2-angular-inputs';
import { API_BASE_URL, vfsApi } from 'src/app/shared/api-config';
import { Observable } from 'rxjs';
import { inputs } from '@syncfusion/ej2';
import { type } from 'os';
import { highlightSearch } from '@syncfusion/ej2-dropdowns';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-company-identification-uploader',
  templateUrl: './company-identification-uploader.component.html',
  styleUrls: ['./company-identification-uploader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyIdentificationUploaderComponent implements OnInit {
  @Output() uploadVfsEvent: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Input() table_id: any;
  @Input() table_name: any;
  @Input() uploadedbyfkempid: any;
  @Input() category: any;
  uploadingFiles: any;
  @ViewChild('documentsUpload')
  public documentsUpload: UploaderComponent;

  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove',
  };

  file: any;

  constructor(private http: HttpClient, private fileservice : FileUploadService) {} // Inject HttpClient
  ngOnInit(): void {
    console.log(
      this.table_id,
      this.table_name,
      this.uploadedbyfkempid,
      this.category
    );
  }

  onDocumentsSelected(args: SelectedEventArgs) {
    const documents = args.filesData.map(
      (fileInfo) => fileInfo.rawFile as Blob
    );
    this.file = args.filesData[0];
    // setTimeout(() => {
    //   this.dooo(this.file);
    // }, 1000);
    const selectedFiles = args.filesData.map(
      (fileInfo) => fileInfo.rawFile as File
    );
    this.uploadingFiles = selectedFiles;
    
    this.uploadVfsEvent.emit(selectedFiles);
    this.fileservice.afterFilesSelected(selectedFiles);
    // this.uploadVfs(selectedFiles); // Call the uploadVfs method here with an array of File objects
  }

  onProgress(event: any) {
    console.log(event);
  }

  // dooo(file: any) {
  //   this.documentsUpload.notify('progress', file);
  //   // this.uploadVfs(this.uploadingFiles)
  // }
  //

}
