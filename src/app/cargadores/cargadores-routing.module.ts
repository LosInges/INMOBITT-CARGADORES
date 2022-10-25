import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaComponent } from './alta/alta.component';

import { CargadoresPage } from './cargadores.page';

const routes: Routes = [
  {
    path: '',
    component: CargadoresPage
  },
  {
    path: 'alta',
    component: AltaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargadoresPageRoutingModule {}
