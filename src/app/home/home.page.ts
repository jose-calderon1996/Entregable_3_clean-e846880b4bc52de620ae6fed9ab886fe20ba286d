import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  color: string = 'primary';

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  navegarRegistro() {
    this.navCtrl.navigateForward('/registro-estudiantil');
  }

  navigateToLogin() {
    this.navCtrl.navigateForward('/login');
  }
  navigateperfil() {
    this.navCtrl.navigateForward('/perfil');
  }

  async navigateToPerfil() {
    const isAuthenticated = await this.authService.isAuthenticated(); // Verifica si el usuario está autenticado
    if (isAuthenticated) {
      this.navCtrl.navigateForward('/perfil-estudiante'); // Solo navega si está autenticado
    } else {
      this.navCtrl.navigateForward('/login'); // Redirige al login si no está autenticado
    }
  }
}
