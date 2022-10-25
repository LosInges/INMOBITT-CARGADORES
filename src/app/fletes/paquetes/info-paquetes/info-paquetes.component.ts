import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  cargadores: Cargador[] = [];
  cargadoresEmpresa: Cargador[] = [];
  cargador: string;
  transporteFlete: TransporteFlete = {
    flete: '',
    transporte: '',
    paquete: [],
    cargadores: [],
  };

  constructor(
    private modalController: ModalController,
    private transporteFletesService: TransporteFleteService,
    private cargadoresService: CargadoresService
  ) { }

  ngOnInit() {
    this.transporteFletesService
      .getTransportesFlete(this.flete)
      .subscribe((transporteFlete) => {
        this.transporteFlete = transporteFlete;
        transporteFlete.cargadores?.forEach((cargador) => {
          this.cargadoresService
            .getCargador('empresa@mail.com', cargador)
            .subscribe((c) => {
              if (this.cargadores.length == 0) this.cargadores = [c]
              else this.cargadores.push(c)
            });
        });
      });

    this.cargadoresService
      .getCargadores('empresa@mail.com')
      .subscribe((c) => (this.cargadoresEmpresa = c));
  }

  cerrar() {
    this.transporteFlete.cargadores = this.cargadores.map(
      (cargador) => cargador.rfc
    );
    this.transporteFletesService
      .postTransportesFlete(this.transporteFlete)
      .subscribe((val) => {
        if (val.results) this.modalController.dismiss();
      });
  }

  eliminar(cargador: Cargador) {
    this.cargadores = this.cargadores.filter((c) => c != cargador);
  }

  agregar() {
    if (!this.cargador) return;
    if (
      this.cargadores.filter((cargador) => cargador.rfc == this.cargador)
        .length == 0
    )
      if (this.cargadores)
        this.cargadores.push(
          this.cargadoresEmpresa.filter((c) => c.rfc == this.cargador)[0]
        );
      else
        this.cargadores = [
          this.cargadoresEmpresa.filter((c) => c.rfc == this.cargador)[0],
        ];
  }
}
