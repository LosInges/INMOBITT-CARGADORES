import { ModalController } from '@ionic/angular';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Estado } from 'src/app/interfaces/estado';
import { EstadosService } from 'src/app/services/estados.service';
import { Precarga } from '../interfaces/precarga';
import { PrecargaService } from '../services/precarga.service';
import { DetalleComponent } from './detalle/detalle.component';
import { EmpresaService } from '../services/empresa.service';
import { Empresa } from '../interfaces/empresa';
import { SessionService } from 'src/app/services/session.service';
import { PrecargaComponent } from './precarga/precarga.component';

@Component({
  selector: 'app-precargas',
  templateUrl: './precargas.component.html',
  styleUrls: ['./precargas.component.scss'],
})
export class PrecargasComponent implements OnInit, OnDestroy {
  estados: Estado[] = this.estadosService.getEstados();
  precargas: Precarga[];
  eventosRouter: any;
  empresas: Empresa[];
  empresa: string;

  constructor(
    private empresaService: EmpresaService,
    private estadosService: EstadosService,
    private precargaService: PrecargaService,
    private modalControler: ModalController,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.eventosRouter = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.sessionService.get('empresa')?.then((empresa) => {
      this.empresa = empresa
      this.empresaService
        .getEmpresas()
        .subscribe((empresas) => (this.empresas = empresas));
      this.precargaService.getPrecargas(empresa).subscribe((precargas) => {
        this.precargas = precargas;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.eventosRouter) {
      this.eventosRouter.unsubscribe();
    }
  }
  async abrirDetalle(precarga: Precarga) {
    let hr = Number(precarga.hora.split(':')[0]);
    hr = hr >= 6 ? hr - 6 : hr + 18;

    const fecha = new Date(
      Number(precarga.fecha.split('-')[0]), //AÑO
      Number(precarga.fecha.split('-')[1]) - 1, //MES (INDICE)
      Number(precarga.fecha.split('-')[2]), //DÍA
      hr, //HORA
      Number(precarga.hora.split(':')[1]) //MINUTOS
    );
    const modal = await this.modalControler.create({
      component: DetalleComponent,
      componentProps: { precarga, fecha: fecha.toISOString() },
    });
    modal.onDidDismiss().then((val) => {
      if (val.data)
        this.precargas = this.precargas.filter((p) => precarga != p);
    });
    return await modal.present();
  }

  async abrirRegistro() {
    const modal = await this.modalControler.create({
      component: PrecargaComponent,
      componentProps: { empresas: this.empresas },
    });
    modal.onDidDismiss().then((val) => {
      if (val.data) {
        if(val.data.empresa == this.empresa) this.precargas.push(val.data);
      }

      console.log(val)
    });
    return await modal.present();
  }

  cerrar() {
    this.modalControler.dismiss();
  }

  eliminar(precarga: Precarga) {
    this.precargaService
      .deletePrecarga(precarga.empresa, precarga.id)
      .subscribe((val) => {
        this.precargas = val.results
          ? this.precargas.filter((p) => p != precarga)
          : this.precargas;
      });
  }
}
