import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';
import { Cargador } from '../../interfaces/cargador';
import { TransporteFlete } from '../../interfaces/transporte-flete';
import { CargadoresService } from '../../services/cargadores.service';
import { TransporteFleteService } from '../../services/transporte-flete.service';
@Component({
  selector: 'app-info-paquetes',
  templateUrl: './info-paquetes.component.html',
  styleUrls: ['./info-paquetes.component.scss'],
})

export class InfoPaquetesComponent implements OnInit {
  @Input() flete: string;
  @Input() contacto = '';
  cargadores: Cargador[] = [];
  cargador: string;
  api = environment.api;
  transporteFlete: TransporteFlete = {
    flete: '',
    transporte: '',
    paquete: [],
    cargadores: [],
  };

  constructor(
    private modalController: ModalController,
    private transporteFletesService: TransporteFleteService,
    private cargadoresService: CargadoresService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.sessionService.get('empresa').then((empresa) => {
      this.transporteFletesService
        .getTransportesFlete(this.flete)
        .subscribe((transporteFlete) => {
          this.transporteFlete = transporteFlete;
          transporteFlete.cargadores.forEach((cargador) => {
            this.cargadoresService
              .getCargador(empresa, cargador)
              .subscribe((c) => {
                if (this.cargadores.length === 0) {
                  this.cargadores = [c];
                } else {
                  this.cargadores.push(c);
                }
              });
          });
        });
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
