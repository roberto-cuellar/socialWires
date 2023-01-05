import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateMessageInterface } from '../../../utils/interfaces';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.scss']
})
export class MyMessagesComponent implements OnInit {
  
  // Formulario con input para el filtro de los mensajes del usuario actual
  public myMessagesForm: FormGroup = this.fb.group({
    date: [null],
  });

  public myMessagesEntidad : Array<CreateMessageInterface> = [
    // {
    //   title: 'Do you want to make a living by giving your sports predictions',
    //   messages: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    //   usuario: 'roberto cuellar',
    //   fecha: '10:25 am 20/11/22'
    // },
    // {
    //   title: 'What is e-sports',
    //   messages: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    //   usuario: 'roberto cuellar',
    //   fecha: '10:25 am 21/11/22'
    // },
  ];

  public name: string = '';
  private uid: string = '';

  constructor(
    private fb: FormBuilder,
    private messagesService: MessagesService
  ){}

  ngOnInit(): void {
      this.uid = localStorage.getItem('uid')? localStorage.getItem('uid')!: '';
      this.name = localStorage.getItem('name')? localStorage.getItem('name')!: '';
      if(this.uid){
        this.actualizarRegistros(this.uid);
      }
  }

  // Metodo encargado de actualizar los registros
  actualizarRegistros(uid:string, date?:string){
    this.messagesService.listarMensajesUsuario( uid,date).subscribe(res=>{
      if(res.ok){
        this.myMessagesEntidad = [];
        res.data.forEach((registro:any) =>{
          const regis = {
            title: registro.title,
            messages: registro.body,
            //   messages: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            usuario: this.name,
            fecha: registro.time +'  '+registro.date 
          }
          this.myMessagesEntidad.push(regis);
        })
      }          
    })
  }

  // Metodo encargado de realizar la busqueda si existe fecha seleccionada
  cambioSelector(evento:string){
    const {date} = this.myMessagesForm.value;
    const dateString = this.messagesService.formatearDate(date);
    this.actualizarRegistros(this.uid,dateString);
  }


}
