import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ModalController } from '@ionic/angular';
import { Paquete } from '../interfaces/paquete';
import { TransporteFlete } from '../interfaces/transporte-flete';
import { TransporteFleteService } from '../services/transporte-flete.service';
import { InfoPaquetesComponent } from './info-paquetes/info-paquetes.component';
import { PaquetesService } from '../services/paquetes.service';


@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
})
export class PaquetesComponent implements OnInit {

  transporteFlete: TransporteFlete = {
    flete: '',
    transporte: '',
    paquete: [],
    cargadores: [],
  };

  constructor(
    private router: Router,
    private modalController: ModalController,
    private activedRoute: ActivatedRoute,
    private transporteFleteService: TransporteFleteService,
    private paquetesService: PaquetesService
  ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      //Solicitar info de transporte flete y guardar los paquetes de la respuesta en paquetes
      this.transporteFleteService
        .getTransportesFlete(params.id)
        .subscribe((transporteFlete) => {
          this.transporteFlete = transporteFlete;
        });
    });
  }

  async altaPaquete() {
    if (this.transporteFlete.paquete) {
      this.transporteFlete.paquete.push(uuidv4());
    } else {
      this.transporteFlete.paquete = [uuidv4()];
    }
    this.transporteFleteService
      .postTransportesFlete(this.transporteFlete)
      .subscribe();
  }

  async verInformacion() {
    const modal = await this.modalController.create({
      component: InfoPaquetesComponent,
      componentProps: { flete: this.transporteFlete.flete },
    });
    return await modal.present();
  }
  eliminar(paquete: string) {
    this.paquetesService.deletePaquete(paquete).subscribe((va) => {
      this.transporteFlete.paquete = va.results
        ? this.transporteFlete.paquete.filter((pa) => pa != paquete) : this.transporteFlete.paquete
      this.transporteFleteService.postTransportesFlete(this.transporteFlete).subscribe()
    })
  }
  navegar(paquete: string) {
    this.router.navigate(['./', paquete, 'items'], { relativeTo: this.activedRoute })
  }
}
