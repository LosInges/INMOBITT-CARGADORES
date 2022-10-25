import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Transporte } from 'src/app/fletes/interfaces/transporte';
import { TransportesService } from 'src/app/fletes/services/transportes.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit {
  @Input() empresa: string;

  transporte: Transporte = {
    matricula: '',
    capacidad: 0,
    empresa: '',
    activo: true,
  };

  constructor(
    private transportesService: TransportesService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.transporte.empresa = this.empresa;
  }

  cerrar() {
    return this.modalController.dismiss();
  }

  registrarTransporte() {
    this.transportesService
      .postTransporte(this.transporte)
      .subscribe((transporte) => this.modalController.dismiss(this.transporte));
  }
}
