import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cargador } from 'src/app/fletes/interfaces/cargador';
import { CargadoresService } from 'src/app/fletes/services/cargadores.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() cargador: Cargador
  apellido1: string;
  apellido2: string;
  constructor(private modalController: ModalController,
    private cargadoresService: CargadoresService) { }

  ngOnInit() {
    this.apellido1 = this.cargador.apellido.split(" ")[0];
    this.apellido2 = this.cargador.apellido.split(" ").length > 1 ? this.cargador.apellido.split(" ")[1] : "";
  }

  cerrar() {
    this.modalController.dismiss({ cargador: this.cargador, actualizado: false })
  }

  actualizarCargador() {
    this.cargador.apellido = this.apellido1 + ' ' + this.apellido2;
    this.cargadoresService.postCargador(this.cargador).subscribe(val => {
      if (val.results) this.modalController.dismiss({ cargador: this.cargador, actualizado: true })
      else console.log(val)
    })
  }
}
