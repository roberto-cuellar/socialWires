import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup = this.fb.group({
    nickname: [null, [Validators.required]],
    name: [null, [Validators.required]],
    email: [null, [Validators.required,Validators.email]],
    password: [null, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  // Metodo encargado de redireccionar a la vista de login
  irLogin(){
    this.router.navigate(['/auth/login']);
  }

  // Metodo encargado de crear la cuenta y redireccionar a la vista principal
  crearCuenta(){
    // Se valida si el formulario es valido

    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      console.log('Formulario invalido');      
      return
    }
    
    // Se obtienen los valores para realizar el login
    const {email,password,nickname,name} = this.registerForm.value;
    console.log('Email: ',email,', Password: ',password, ', name: ',name,', nickname: ', nickname); 
  }

}
