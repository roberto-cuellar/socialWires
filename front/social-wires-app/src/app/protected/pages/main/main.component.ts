import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public name: string = localStorage.getItem('username')? localStorage.getItem('username')!: '';

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ){}

  // Metodo encargado de redireccionar a la vista de crear mensaje
  irCrearMensaje(){
    this.router.navigate(['create-messages'], { relativeTo: this.activateRoute });
  }

  // Metodo encargado de redireccionar a la vista de mis mensajes
  irMisMensajes(){
    this.router.navigate(['messages'], { relativeTo: this.activateRoute });
  }

  // Metodo encargado de redireccionar a la vista de todos los mensajes
  irMensajes(){
    this.router.navigate(['all-messages'], { relativeTo: this.activateRoute });
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
