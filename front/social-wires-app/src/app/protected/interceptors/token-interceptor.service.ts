import { Injectable } from '@angular/core';

import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    // Se setea el header x-token para con el token de autenticacion en caso de que exista, caso contrario no
    if(localStorage.getItem('token')){
      const headers = new HttpHeaders({
        'x-token': localStorage.getItem('token')!
      });
      
      const reqClone = req.clone({
        headers
      });

      return next.handle(reqClone)
    }

    return next.handle(req)


  }

}