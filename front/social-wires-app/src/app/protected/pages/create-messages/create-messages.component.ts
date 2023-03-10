import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

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

  public name: string = '';
  private uid: string = '';

  public genericTitle: string = 'Aquí iría el título de tu mensaje';
  public genericMessages: string = 'Tu mensaje se vería así en este espacio, se creativo, estamos emocionados por leerte.';

  public fechaMostrar: string = '';

  private timer:any;

  public msgModal: string = '';
  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private messageService: MessagesService,
    // Inyeccion modal
    public dialog: MatDialog
  ){}

  ngOnInit(): void {

    this.name = localStorage.getItem('username')? localStorage.getItem('username')!: '';
    this.uid = localStorage.getItem('uid')? localStorage.getItem('uid')!: '';

    // Se obtiene el usuario del servicio de autenticacion
    this.createMessagePreviewObject.usuario = this.name;

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
      this.messageService.crearMensaje(title, messages, this.name, this.uid).subscribe(response=>{
        if(response.ok){
          this.abrirModal();
        }
      })

  }

  // Metodo encargado de setear la info del modal y su apertura
  abrirModal(){
    this.dialog.open(ModalConfirmacionComponent,{
     
  });
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

@Component({
  selector: 'modal-confirmacion-creacion',
  templateUrl: 'modal-confirmacion.component.html' 
})
export class ModalConfirmacionComponent {
}
