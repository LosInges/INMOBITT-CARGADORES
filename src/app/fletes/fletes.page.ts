import { ModalController } from '@ionic/angular';
import { AltaComponent } from './alta/alta.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Flete } from './interfaces/flete';
import { FletesService } from './services/fletes.service';
import { TransporteFleteService } from './services/transporte-flete.service';
//[routerLink]="['/', 'fletes', flete.id, 'paquetes']"

@Component({
  selector: 'app-fletes',
  templateUrl: './fletes.page.html',
  styleUrls: ['./fletes.page.scss'],
})
export class FletesPage implements OnInit {
  eventosRouter: any;
  fletes: Flete[] = [];
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private fletesService: FletesService,
    private transporteFleteService: TransporteFleteService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.sessionService.get('empresa')?.then((empresa) => {
      this.fletesService.getFletesE(empresa).subscribe((fletes) => {
        this.sessionService.get('tipo')?.then((tipo) => {
          if (tipo === 'cargador')
            this.sessionService.get('rfc')?.then((rfc) => {
              fletes.forEach((flete) =>
                this.transporteFleteService
                  .getTransportesFlete(flete.id)
                  .subscribe((transporteFlete) => {
                    console.log(transporteFlete);
                    if (transporteFlete.cargadores != null) {
                      if (transporteFlete.cargadores.indexOf(rfc) >= 0)
                        this.fletes.push(flete);
                    }
                  })
              );
            });
          else this.fletes = fletes;
        });
      });
    });
  }

  async abrirRegistro() {
    const modal = await this.modalController.create({
      component: AltaComponent,
    });

    return await modal.present();
  }

  eliminar(flete: Flete) {
    this.fletesService.deleteFlete(flete).subscribe((val) => {
      this.fletes = val.results
        ? this.fletes.filter((f) => f != flete)
        : this.fletes;
    });
  }

  navegar(flete: Flete) {
    this.router.navigate(['/', 'fletes', flete.id, 'paquetes']);
  }
}
