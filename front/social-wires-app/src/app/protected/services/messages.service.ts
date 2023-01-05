import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }


  // Metodo encargado de crear un mensaje para un usuario
  crearMensaje(title: string, body: string, name: string, uid: string){
    const url = `${ this.baseUrl }/message/add`;
    const payload = { title, body, name, uid };
    return this.http.post<any>(url,payload)
  }

  // Metodo encargado de traer los registros de mensajes por usuario
  listarMensajesUsuario(uid:string, date?:string ){
    const url = `${ this.baseUrl }/message/user-messages`;
    let params = new HttpParams();
    params = params.append('uid',uid);
    if(date){
      params = params.append('date',date);
    }
    return this.http.get<any>(url,{params:params})
  }

  // Metodo encargado de traer los registros de mensajes de todos los usuarios
  listarTodos(date?:string, text?: string){
    const url = `${ this.baseUrl }/message/all-user-messages`;
    let params = new HttpParams();
    if(date){
      params = params.append('date',date);
    }
    if(text){
      params = params.append('text',text);
    }
    return this.http.get<any>(url,{params:params})
  }


  // Metodo encargado de reconfigurar la fecha yyyy-mm-dd a dd-mm-yyyy
  formatearDate(fecha:string){
    return Number(fecha.split('-')[2])+'/'+Number(fecha.split('-')[1])+'/'+fecha.split('-')[0];
  }

}
