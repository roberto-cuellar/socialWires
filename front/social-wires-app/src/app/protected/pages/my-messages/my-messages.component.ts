import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateMessageInterface } from '../../../utils/interfaces';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.scss']
})
export class MyMessagesComponent {
  
  // Formulario con input para el filtro de los mensajes del usuario actual
  public myMessagesForm: FormGroup = this.fb.group({
    date: [null],
  });

  public myMessagesEntidad : Array<CreateMessageInterface> = [
    {
      title: 'Do you want to make a living by giving your sports predictions',
      messages: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      usuario: 'roberto cuellar',
      fecha: '10:25 am 20/11/22'
    },
    {
      title: 'What is e-sports',
      messages: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      usuario: 'roberto cuellar',
      fecha: '10:25 am 21/11/22'
    },
  ];

  constructor(
    private fb: FormBuilder
  ){}

  // Metodo encargado de realizar la busqueda si existe fecha seleccionada
  cambioSelector(evento:string){
    console.log('Evento: ',evento, this.myMessagesForm.value);    
  }


}
