import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'; // Importa Router
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = '';  // Inicializa las variables
  comuna: string = '';
  direccion: string = '';
  fechaNacimiento: string = '';
  carrera: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserData().subscribe(
      (data) => {
        this.nombre = data.nombre;
        this.comuna = data.comuna;
        this.direccion = data.direccion;
        this.fechaNacimiento = data.fechaNacimiento;
        this.carrera = data.carrera;
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }

  navegarEscaner() {
    this.router.navigate(['/escaner']); // Redirige a la página del escáner
  }
  async cerrarSesion() {
    try {
      await this.authService.logout(); // Llama al método de logout
      this.router.navigate(['/login']); // Redirige al usuario a la página de login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
