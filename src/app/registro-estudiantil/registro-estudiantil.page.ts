import { Component } from '@angular/core';

import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { RegistroUsuario } from 'src/modelos/usuario.interface';

@Component({
  selector: 'app-registro-estudiantil',
  templateUrl: './registro-estudiantil.page.html',
})
export class RegistroEstudiantilPage {
  userData: null | undefined;

  datosUsuario: RegistroUsuario = {
    nombre: '',
    comuna: '',
    direccion: '',
    fechaNacimiento: '',
    carrera: '',
    correo: '',
    contrasena: ''
  };
 

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.datosUsuario; 
  }

  async registrar() {
    // Validación de campos
    if (
      !this.datosUsuario.nombre || 
      !this.datosUsuario.comuna || 
      !this.datosUsuario.direccion || 
      !this.datosUsuario.fechaNacimiento || 
      !this.datosUsuario.carrera || 
      !this.datosUsuario.correo || 
      !this.datosUsuario.contrasena
    ) {
      this.mostrarToast('Por favor, completa todos los campos');
      return;
    }

    // Mostrar animación de "Registrando usuario"
    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
      duration: 3000 // Duración máxima de la animación de carga: 3 segundos
    });
    await loading.present();

    try {
      // Registro de usuario en Firebase Authentication
      const userCredential = await this.authService.register(this.datosUsuario.correo, this.datosUsuario.contrasena);

      if (userCredential.user) {
        // Guardar datos adicionales en Firestore
        await this.authService.saveUserData(userCredential.user.uid, {
          nombre: this.datosUsuario.nombre,
          comuna: this.datosUsuario.comuna,
          direccion: this.datosUsuario.direccion,
          fechaNacimiento: this.datosUsuario.fechaNacimiento,
          carrera: this.datosUsuario.carrera
        });
        
        this.mostrarToast('Registro exitoso');
        this.navCtrl.navigateForward('/login'); // Navegar a la página de inicio de sesión
      } else {
        this.mostrarToast('Error en el registro');
      }

    } catch (error) {
      // captura mi error de correo existente 
      if (error === 'auth/email-already-in-use') {
        this.mostrarToast('El correo ya está en uso por otra cuenta');
      } else {
        this.mostrarToast('Error en el registro');
        console.error('Error en el registro:', error);
      }
    } finally {
      // Cerrar animación de carga independientemente del resultado
      loading.dismiss();
    }
  }

  async mostrarToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    await toast.present();
  }

  navigateToLogin() {
    this.navCtrl.navigateBack('/login'); 
  }
}

//jejejej 4 nov