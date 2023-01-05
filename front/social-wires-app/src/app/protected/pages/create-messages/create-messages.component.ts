import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

import { CreateMessageInterface } from '../../../utils/interfaces';
import { MessagesService } from '../../services/messages.service';
@Component({
  selector: 'app-create-messages',
  templateUrl: './create-messages.component.html',
  styleUrls: ['./create-messages.component.scss']
})
export class CreateMessagesComponent implements OnInit, OnDestroy {

  public createMessageForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    messages: [null, Validators.required],
  });

  public createMessagePreviewObject: CreateMessageInterface= {
    title: '',
    messages: '',
    usuario: '',
    fecha: ''
  }

  public genericTitle: string = 'Aquí iría el título de tu mensaje';
  public genericMessages: string = 'Tu mensaje se vería así en este espacio, se creativo, estamos emocionados por leerte.';

  public fechaMostrar: string = '';

  private timer:any;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private messageService: MessagesService
  ){}

  ngOnInit(): void {
    // Se obtiene el usuario del servicio de autenticacion
    this.createMessagePreviewObject.usuario ='Roberto Cuellar';

    // Actualizacion inicial del titulo y el mensaje
    this.actualizacionTitleMessage();

    // Se establece un timer que en cada minuto actualice la fecha
    this.temporizadorFecha();
  }

  // Metodo encargado de actualizar el titulo y el mensaje del preview
  actualizacionTitleMessage(){
    // Se extraen los valores del formulario
    const {title,messages} = this.createMessageForm.value;
    // Se asignan al objeto de crear mensaje
    this.createMessagePreviewObject.title = title? title: this.genericTitle;
    this.createMessagePreviewObject.messages = messages? messages: this.genericMessages;
  }

  // Metodo encargado de actualizar la fecha cada minuto
  temporizadorFecha(){
    this.timer = setInterval(
      this.obtenerFecha,60000
    )
  }

  // Metodo encargado de obtener el tiempo actual y actualizarlo en la previsualizacion
  obtenerFecha = () =>{
    const fecha = new Date();
    const fechaAux = fecha.getHours()+':'+ fecha.getMinutes()+' '+ (Number(fecha.getDay())+1)+'/'+ (Number(fecha.getMonth())+1)+'/'+ fecha.getFullYear()
    this.fechaMostrar = fechaAux;
    this.createMessagePreviewObject.fecha = fechaAux;
    this.ref.detectChanges();
  }

  // Metodo encargado de compartir el mensaje
  share(){  
      const { title, messages } = this.createMessageForm.value;
      this.messageService.crearMensaje(title, messages, 'Roberto', '63b5f5dc66e271507017d5dd').subscribe(response=>{
        console.log('Response', response);        
      })

  }

  // Metodo encargado de actualizar el preview de la card
  actualizarPreview(){
    // Se actualiza el preview
    this.actualizacionTitleMessage()

    

  }

  ngOnDestroy(): void {
    // Se resetea el temporizador para evitar fugas de memoria
    clearInterval(this.timer);
  }

}
