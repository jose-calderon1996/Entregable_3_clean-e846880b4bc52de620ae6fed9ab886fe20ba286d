import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroEstudiantilPageRoutingModule } from './registro-estudiantil-routing.module';

import { RegistroEstudiantilPage } from './registro-estudiantil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroEstudiantilPageRoutingModule
  ],
  declarations: [RegistroEstudiantilPage]
})
export class RegistroEstudiantilPageModule {}
