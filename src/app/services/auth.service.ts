import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuario: any;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Método para verificar si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    return user !== null;
  }

  // Método para guardar datos adicionales en Firestore
  async saveUserData(uid: string, data: { nombre: string; comuna: string; direccion: string; fechaNacimiento: string; carrera: string }) {
    return this.firestore.collection('users').doc(uid).set(data);
  }

  // Método para iniciar sesión
  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para registrar usuario
  async register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Método para obtener los datos del usuario como Observable
  getUserData(): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.currentUser.then((user) => {
        if (user) {
          this.firestore.collection('users').doc(user.uid).valueChanges().subscribe(
            (data) => {
              if (data) {
                observer.next(data);
              } else {
                observer.error(new Error('No se encontraron datos para este usuario.'));
              }
            },
            (error) => observer.error(error)
          );
        } else {
          observer.error(new Error('No hay usuario autenticado'));
        }
      });
    });
  }

  // Método para cambiar la contraseña 
  async cambiarContrasena(nuevaContrasena: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.updatePassword(nuevaContrasena);
      console.log('Contraseña cambiada exitosamente.');
    } else {
      throw new Error('No hay usuario autenticado para cambiar la contraseña.');
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut(); // Cierra sesión en Firebase
      console.log('Sesión cerrada exitosamente.');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  }
}
