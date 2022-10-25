import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Transporte } from 'src/app/fletes/interfaces/transporte';
import { TransportesService } from 'src/app/fletes/services/transportes.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() transporte: Transporte

  constructor(
    private transportesService: TransportesService,
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  cerrar() {
    return this.modalController.dismiss({ transporte: this.transporte, actualizado: false });
  }


  actualizarTransporte() {
    this.transportesService.postTransporte(this.transporte).subscribe(val => {
      if (val.results) this.modalController.dismiss({ transporte: this.transporte, actualizado: true })
      else console.log(val)
    })
  }
}
