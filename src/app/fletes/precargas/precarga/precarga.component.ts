
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Empresa } from '../../interfaces/empresa';
import { Precarga } from '../../interfaces/precarga';
import { PrecargaService } from '../../services/precarga.service';

@Component({
  selector: 'app-precarga',
  templateUrl: './precarga.component.html',
  styleUrls: ['./precarga.component.scss'],
})
export class PrecargaComponent implements OnInit {
  fecha: string = new Date().toISOString();
  @Input() empresas: Empresa[]

  precarga: Precarga = {
    id: '',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_chicas: 0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_grandes: 0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_medianas: 0,
    muebles: 0,
    empresa: '',
    cliente: '',
    destino: {
      calle: 'Lago Ontario',
      codigopostal: '63173',
      colonia: 'Lagos del Country',
      numeroexterior: '10',
      numerointerior: '',
      estado: 'Nayarit',
    },
    fecha: '',
    hora: '',
    origen: {
      calle: 'Av. Tecnologico',
      codigopostal: '63175',
      colonia: 'Lagos del Country',
      numeroexterior: '2595',
      numerointerior: '',
      estado: 'Nayarit',
    },
    telefono: '',
  };

  constructor(
    private precargaService: PrecargaService,
    private modalController: ModalController
  ){
  }

  ngOnInit() {
  }

  registrarPrecarga() {
   this.precarga.fecha = this.fecha.split('T')[0];
    this.precarga.hora = this.fecha.split('T')[1].split('.')[0].substring(0, 5);
     this.precargaService.postPrecarga(this.precarga).subscribe((res) => {
     if (res.results) this.modalController.dismiss(this.precarga)
     else console.log(res)
    });
  }

  cerrar(){
    this.modalController.dismiss()
  }

}
