import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroEstudiantilPage } from './registro-estudiantil.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroEstudiantilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroEstudiantilPageRoutingModule {}
