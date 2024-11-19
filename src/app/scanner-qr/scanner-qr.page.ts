import { Component } from '@angular/core';
import { BarcodeScanner } from 'capacitor-barcode-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  textoEscaneado: string = ''; // Contenido del código QR
  mensaje: string = ''; // Mensajes para el usuario
  datosQR: any = {}; // JSON extraído del contenido del QR

  constructor() {}

  // Método para obtener las claves del JSON
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  async escanear() {
    try {
      const resultado: any = await BarcodeScanner.scan();
      console.log('Resultado del escaneo:', resultado);

      if (resultado && resultado.hasOwnProperty('code')) {
        this.textoEscaneado = resultado.code;
        console.log('Contenido del QR:', this.textoEscaneado);

        try {
          this.datosQR = JSON.parse(this.textoEscaneado);
          this.mensaje = 'QR escaneado y datos extraídos correctamente.';
          console.log('Datos extraídos:', this.datosQR);
        } catch (error) {
          console.error('El contenido no es un JSON válido:', error);
          this.mensaje = 'El contenido escaneado no es un JSON válido.';
          this.datosQR = {}; // Limpiar datos en caso de error
        }
      } else {
        this.mensaje = 'No se detectó contenido en el QR.';
      }
    } catch (error) {
      console.error('Error durante el escaneo:', error);
      this.mensaje = 'Ocurrió un error durante el escaneo.';
    }
  }
}
