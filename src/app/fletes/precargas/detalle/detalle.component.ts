import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { AltaComponent } from '../../alta/alta.component';
import { Empresa } from '../../interfaces/empresa';
import { Precarga } from '../../interfaces/precarga';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() fecha: string
  @Input() precarga: Precarga
  empresa: string


  constructor(
    private modalControler: ModalController,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.sessionService.get('empresa')?.then(empresa =>{
      this.empresa= empresa
     //precarga service ..()
    })
  }

  cerrar(){
    this.modalControler.dismiss()
  }

 async abrirRegistroFlete(){
    const modal= await this.modalControler.create({
      component: AltaComponent,
      componentProps: { precarga: this.precarga, fecha: this.fecha},

    })
    modal.onDidDismiss().then(val=>{
      if(val.data?.registrado) this.modalControler.dismiss(this.precarga)
    })
    return await modal.present()
  }

}

