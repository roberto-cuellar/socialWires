import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup = this.fb.group({
    email: [null, [Validators.required,Validators.email]],
    password: [null, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  // Metodo encargado de realizar el posteo de la informacion de usuario para realizar el login
  login(){
    // Se valida si el formulario es valido

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      console.log('Formulario invalido');      
      return
    }
    
    // Se obtienen los valores para realizar el login
    const {email,password} = this.loginForm.value;
    console.log('Email: ',email,', Password: ',password);   
  }

  // Metodo encargado de ir a la vista de crear cuenta
  irCrearCuenta(){
    this.router.navigate(['/auth/registro']);
  }

}
