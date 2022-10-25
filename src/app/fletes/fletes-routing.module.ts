import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FletesPage } from './fletes.page';
import { DetallePaqueteComponent } from './paquetes/detalle-paquete/detalle-paquete.component';
import { PaquetesComponent } from './paquetes/paquetes.component';

const routes: Routes = [
  {
    path: '',
    component: FletesPage,
  },
  {
    path: ':id/paquetes',
    component: PaquetesComponent,
  },
  {
    path: ':flete/paquetes/:id/items',
    component: DetallePaqueteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletesPageRoutingModule {}
