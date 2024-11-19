import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  scannedData: any = null;

  constructor(private platform: Platform) {}

  ionViewWillEnter() {
    // Se detiene la cámara de escaneo al salir de la página
    BarcodeScanner.hideBackground(); 
  }

  startScan() {
    // Iniciar el escaneo
    BarcodeScanner.startScan().then((result) => {
      if (result.hasContent) {
        this.scannedData = result.content;
      } else {
        alert('No se encontró un código QR válido');
      }
    }).catch((err) => {
      console.error('Error al escanear: ', err);
      alert('Hubo un error al intentar escanear el código');
    });
  }

  stopScan() {
    // Detener la cámara de escaneo
    BarcodeScanner.stopScan();
  }

  toggleTorch() {
    // Activar o desactivar el foco de la cámara
    BarcodeScanner.toggleTorch();
  }
}
