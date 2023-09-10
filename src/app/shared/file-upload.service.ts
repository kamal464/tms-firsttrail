import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  files = [];
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>('your-upload-url', formData);
  }

  afterFilesSelected = (filesSelected) => {
    this.files = filesSelected;
  };
}
