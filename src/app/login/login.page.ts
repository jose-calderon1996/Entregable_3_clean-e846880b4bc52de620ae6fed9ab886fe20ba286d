import { Component, inject, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loadingController = inject(LoadingController);
  private alertas = inject(AlertController);
  private navCtrl = inject(NavController); // Agrega el NavController para la navegación

  // Variables locales para capturar con ngModel
  email: string = "";
  password: string = "";
  color: string = 'primary'; // o el color que prefieras (e.g., 'secondary', 'danger', etc.)
  private authService = inject(AuthService);
  

  constructor() { }
  async validadInnicio() {
    try {
      await this.authService.login(this.email, this.password);
      this.navCtrl.navigateForward('/home');  // Navega a la página de inicio
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      // Puedes agregar una alerta o mensaje de error aquí
    }
  }

  async presentAlert() {
    const alert = await this.alertas.create({
      header: 'Error de inicio de sesión',
      message: 'Correo o contraseña incorrectos. Inténtalo nuevamente.',
      buttons: ['OK']
    });
    
    await alert.present();
  }

  async animacionLogin() {
    // Crea el loading con un mensaje
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      duration: 3000 // Duración de la animación de carga: 3 segundos
    });

    await loading.present();
    await loading.onDidDismiss();

    // Navega a la página de perfil de estudiante después de la animación de carga
    this.navCtrl.navigateForward('/perfil-estudiante');
  }

 
  vistaPass() {
    this.navCtrl.navigateForward('/cambio-pass'); // Navega a la página de cambio de contraseña
  }

  ngOnInit() { }
}


// equisde