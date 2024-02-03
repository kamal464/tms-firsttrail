

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { Api_Base } from '../api-config';
import { data } from '@syncfusion/ej2';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReasonDataService {

  constructor(private http: HttpClient) { }

  getReason(reasonname: string): Observable<any> {
    const reasonitemurl =  `${Api_Base}/utils/dropdown/reason`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('reason', reasonname); 
    return this.http.post(reasonitemurl, {}, { headers });
  }

  getTableData(tablename: string, json?: any): Observable<any> {
    const apiUrl = `${Api_Base}/${tablename}/getlist`;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    let body: any = {
      page: 0,
      limit: 0,
      filters: [],
      order_by: []
    };
  
    console.log(json);
    // Add filters based on the properties of the json object
    if (json) {
      body.filters = Object.entries(json).map(([jsonkey, jsonvalue]) => ({
        name: jsonkey,
        value: jsonvalue
      }));
      body.order_by= Object.entries(json).map(([jsonkey, jsonvalue]) => ({
        name:jsonkey,
        value:'asc'
      }));
    }
  
    return this.http.post(apiUrl, body).pipe(
      catchError((error) => {
        console.error('Error in API call:', error);
        return throwError(error); // Propagate the error to the subscriber
      })
    );
}

}
