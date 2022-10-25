import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FletesPageRoutingModule } from './fletes-routing.module';
import { FletesPage } from './fletes.page';
import { PaqueteComponent } from './paquetes/paquete/paquete.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { DetallePaqueteComponent } from './paquetes/detalle-paquete/detalle-paquete.component';
import { InfoPaquetesComponent } from './paquetes/info-paquetes/info-paquetes.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FletesPageRoutingModule],
  declarations: [
    FletesPage,
    PaqueteComponent,
    PaquetesComponent,
    InfoPaquetesComponent,
    DetallePaqueteComponent
  ],
})
export class FletesPageModule {}
