

export interface usuario {
    nombre: string;               
    correo: string;                
    carrera: string;               
    contrasena: string;            
    confirmarContrasena: string;   
  }


export interface PerfilEstudiante {
  nombre: string;
  comuna: string;
  direccion: string;
  fechaNacimiento: string;
  carrera: string;
  fechaIngreso: string;
}

  
// src/models/User.ts
export interface User {
  nombre: string;
  comuna: string;
  direccion: string;
  fechaNacimiento: string;
  carrera: string;
}

// src/models/RegistroUsuario.ts
// src/models/RegistroUsuario.ts
export interface RegistroUsuario {
  nombre: string;
  comuna: string;
  direccion: string;
  fechaNacimiento: string;
  carrera: string;
  correo: string;
  contrasena: string;
}

