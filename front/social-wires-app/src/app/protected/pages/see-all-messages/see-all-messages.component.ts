import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateMessageInterface } from '../../../utils/interfaces';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-see-all-messages',
  templateUrl: './see-all-messages.component.html',
  styleUrls: ['./see-all-messages.component.scss']
})
export class SeeAllMessagesComponent implements OnInit {

  // Formulario con inputs para los filtros de los mensajes generales
  public allMessagesForm: FormGroup = this.fb.group({
    date: [null],
    title: [null],
  });

  public allMessagesEntidad : Array<CreateMessageInterface> = [
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

  constructor(
    private fb: FormBuilder,
    private messagesService: MessagesService
  ){}

  ngOnInit(): void {
    // Se obtiene el nombre del usuario
    this.name = localStorage.getItem('name')? localStorage.getItem('name')!: '';

    // Se actualizan los registros
    this.actualizarRegistros();

    
  }

  // Metodo encargado de actualizar los registros
  actualizarRegistros(text?:string, date?:string){
    this.messagesService.listarTodos(text,date).subscribe(res=>{
      if(res.ok){
        this.allMessagesEntidad = [];
        res.data.forEach((registro:any) =>{
          const regis = {
            title: registro.title,
            messages: registro.body,
            //   messages: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            usuario: registro.name,
            fecha: registro.time +'  '+registro.date 
          }
          this.allMessagesEntidad.push(regis);
        })
      }          
    })
  }

  // Metodo encargado de realizar la busqueda si existe fecha seleccionada o no
  cambioSelector(evento:string){
    const {date,title} = this.allMessagesForm.value;
    let dateString = '';
    // Se valida si existen los campos de la busqueda
    if(!!!date){          
      
    }else{
      dateString = this.messagesService.formatearDate(date);
    }
    this.actualizarRegistros(dateString,title);    
  }

}
