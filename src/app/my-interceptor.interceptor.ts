import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let myreq = request.clone({
      // method: 'post',
      headers: request.headers.set('Content-Type', 'application/json')
      .set('org_id', '1680009347')
    });
    console.log('request intercepted',myreq);
    return next.handle(myreq);
  }
}
