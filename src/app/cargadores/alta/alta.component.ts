import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Cargador } from 'src/app/fletes/interfaces/cargador';
import { CargadoresService } from 'src/app/fletes/services/cargadores.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit {
  @Input() empresa: string;
  apellido1 = '';
  apellido2 = '';
  cargador: Cargador = {
    rfc: '',
    nombre: '',
    apellido: '',
    password: '',
    telefono: '',
    foto: '',
    empresa: '',
  };

  constructor(
    private cargadoresService: CargadoresService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.cargador.empresa = this.empresa;
  }

  cerrar() {
    return this.modalController.dismiss();
  }

  registrarCargador() {
    this.cargador.apellido = this.apellido1 + ' ' + this.apellido2;
    this.cargadoresService.postCargador(this.cargador).subscribe((res) => {
      this.modalController.dismiss(this.cargador);
    });
  }
}
