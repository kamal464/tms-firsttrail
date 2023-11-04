import {  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  EventEmitter,
  Output, } from '@angular/core';
  import { HttpClient, HttpHeaders ,HttpResponse} from '@angular/common/http';
  import { MatDialog } from '@angular/material/dialog';
  import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { API_BASE_URL, vfsApi } from '../../api-config';
import { columnSpanProperty } from '@syncfusion/ej2/documenteditor';
@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {

  @Input() attachment = null;
  @Input() file = null;
  @Input() readonly = true;
  @Input() isProcessing = false;
  @Output() onDelete = new EventEmitter<any>();

  attachmentThumb = null;
  isPdf = false;

  constructor(
    private dialog: MatDialog,
    private http : HttpClient,
    // private vfsService: VfsService,
    private sanitizer: DomSanitizer,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log(this.attachment);
    this.isPdf =
      (this.attachment && this.attachment.filemimetype == 'application/pdf') ||
      (this.file && this.file.type == 'application/pdf');
    if (!this.isPdf) {
      this.attachment && this._fetchVfsImage();
      if (this.file) {
        const reader = new FileReader();
        reader.onload = (readerEvt) => {
          this.attachmentThumb = this.sanitizer.bypassSecurityTrustStyle(
            `url(${reader.result})`
          );
          this.ref.markForCheck();
        };
        reader.readAsDataURL(this.file);
      }
    }
  }

 
  // downloadVfs(id){
  //   this.http.post(`${vfsApi}/download`,{},{headers :{ vfs_id : id.toString()}},).subscribe((data)=>{
  //     console.log(data,'downloaded successfully')
  //   })
  // }



  // downloadVfs(attachment): void {
  //   // Define the API URL for the file download
  //   // const vfsApi = 'https://example.com/api'; // Replace with your API URL
  //   const apiUrl = `${vfsApi}/get/${attachment.id}`;
  
  //   // Set up the request headers with custom headers
  //   // const headers = new HttpHeaders({
  //   //   vfs_id : id.toString()
  //   // });
  
  //   // Send the HTTP GET request
  //   // {
  //   //   headers :{ vfs_id : attachment.id.toString()},
  //   //   responseType: 'blob', // Specify blob responseType for binary data
  //   //   observe: 'response', // To access the full HTTP response including headers
  //   // }
  //   this.http.get(apiUrl, {}).subscribe(
  //     (response: HttpResponse<Blob>) => {
  //       const contentDisposition = response.headers.get('content-disposition');
  //       const filename = contentDisposition ? contentDisposition.split(';')[1].split('=')[1].trim() : attachment.filename;
  //       const blob = new Blob([response.body], { type: response.body.type });
  
  //       // Create a temporary URL to the blob and trigger the download
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = filename;
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     },
  //     error => {
  //       console.error('Error downloading file:', error);
  //     }
  //   );
  // }


  downloadVfs(attachment): void {
    const apiUrl = `${vfsApi}/get/${attachment.id}`;
  
    const headers = new HttpHeaders({
      'vfs_id': attachment.id.toString(),
    });
  
    this.http.get(apiUrl, { headers, responseType: 'blob', observe: 'response' })
      .subscribe(
        (response: HttpResponse<Blob>) => {
          const contentDisposition = response.headers.get('content-disposition');
          const filename = contentDisposition ? contentDisposition.split(';')[1].split('=')[1].trim() : attachment.filename;
          const blob = new Blob([response.body], { type: response.body.type });
  
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error => {
          console.error('Error downloading file:', error);
        }
      );
  }





  // openAttachment($event): void {
  //   $event.stopPropagation();
  //   const dialogRef = this.dialog.open(AttachmentViewerComponent, {
  //     position: { top: '80px' },
  //     panelClass: 'preview-holder',
  //     data: {
  //       attachment: this.attachment,
  //       file: this.file,
  //       isPdf: this.isPdf,
  //     },
  //   });
  // }



  deleteAttachment($event): void {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      position: { top: '100px' },
      data: {
        title: 'Are you sure',
        dialog_text:
          'Do you want to delete the attachment: <b class="primary-color-text">' +
          (this.attachment ? this.attachment.filename : this.file.name) +
          '</b>. ?',
        yes_button_text: 'Yes, Delete',
        no_button_text: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        setTimeout(() => {
          this.onDelete.emit({
            attachment: this.attachment,
            file: this.file,
            
          });
        });
      }
    });
    
  }

  _fetchVfsImage() {
    // const headers = new HttpHeaders()
    // .set('Content-Type', 'application/json')
    // .set('filtername', 'fkidentificationid')
    // .set('filtervalue', this.attachment.id);

    // this.http.post(`${API_BASE_URL}/t/vfs/getall`,{},{headers}).subscribe((file:any) => {
    //   const fileURL = window.URL.createObjectURL(file);
    //   this.attachmentThumb = this.sanitizer.bypassSecurityTrustStyle(
    //     `url(${fileURL})`
    //   );
    //   this.ref.markForCheck();
    // });
  }
}
