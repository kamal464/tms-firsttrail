  import { Injectable, Inject } from '@angular/core';
  import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable()
  export class MyInterceptorInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
      let myreq = request.clone({
        
        // method: 'post',

      //   headers: request.headers.set('Content-Type', 'application/json')
      //   .set('id', '1685200030300 ')
      });
      // console.log('request intercepted',myreq);
      return next.handle(myreq);
    }
    
  }



