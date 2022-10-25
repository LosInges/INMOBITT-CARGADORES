import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargadoresPage } from './cargadores.page';

const routes: Routes = [
  {
    path: '',
    component: CargadoresPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargadoresPageRoutingModule {}
