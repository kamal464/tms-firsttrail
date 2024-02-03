import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api_Base } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

 

  constructor(private http: HttpClient) { }

 


}
