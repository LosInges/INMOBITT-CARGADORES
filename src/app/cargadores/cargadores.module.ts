import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargadoresPageRoutingModule } from './cargadores-routing.module';

import { CargadoresPage } from './cargadores.page';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargadoresPageRoutingModule
  ],
  declarations: [CargadoresPage, DetalleComponent]
})
export class CargadoresPageModule {}
