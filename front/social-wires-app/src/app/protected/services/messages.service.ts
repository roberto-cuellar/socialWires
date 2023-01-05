import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  crearMensaje(title: string, body: string, name: string, uid: string){

    const url = `${ this.baseUrl }/message/add`

    const payload = { title, body, name, uid };

    return this.http.post<any>(url,payload)
  }

}
