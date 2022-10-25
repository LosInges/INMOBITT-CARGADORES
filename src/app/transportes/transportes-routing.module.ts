import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaComponent } from './alta/alta.component';
import { DetalleComponent } from './detalle/detalle.component';

import { TransportesPage } from './transportes.page';

const routes: Routes = [
  {
    path: '',
    component: TransportesPage,
  },
  {
    path: 'alta',
    component: AltaComponent,
  },
  {
    path: ':matricula',
    component: DetalleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportesPageRoutingModule {}
