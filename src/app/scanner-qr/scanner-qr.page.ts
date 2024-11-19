// scanner-qr.page.ts
import { Component } from '@angular/core';
import { BarcodeScanner } from 'capacitor-barcode-scanner';

@Component({
  selector: 'app-scanner-qr', // Asegúrate de que el selector también coincida con el archivo
  templateUrl: './scanner-qr.page.html', // Cambia esto si es necesario
  styleUrls: ['./scanner-qr.page.scss'],
})
export class ScannerQrPage {  // Cambia el nombre de la clase a ScannerQrPage
  textoEscaneado: string = ''; 
  mensaje: string = '';
  datosQR: any = {};

  constructor() {}

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  async escanear() {
    try {
      const resultado: any = await BarcodeScanner.scan();
      if (resultado && resultado.hasOwnProperty('code')) {
        this.textoEscaneado = resultado.code;
        try {
          this.datosQR = JSON.parse(this.textoEscaneado);
          this.mensaje = 'QR escaneado y datos extraídos correctamente.';
        } catch (error) {
          this.mensaje = 'El contenido escaneado no es un JSON válido.';
          this.datosQR = {};
        }
      } else {
        this.mensaje = 'No se detectó contenido en el QR.';
      }
    } catch (error) {
      this.mensaje = 'Ocurrió un error durante el escaneo.';
    }
  }
}
