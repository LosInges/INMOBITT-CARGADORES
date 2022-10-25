
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Empresa } from 'src/app/fletes/interfaces/empresa';
import { EmpresaService } from 'src/app/fletes/services/empresa.service';
import { EstadosService } from 'src/app/services/estados.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  empresa: Empresa = {
    nombre: '',
    correo: '',
    password: '',
    telefono: '',
    estados: [],
  };
  confirmPassword = '';
  estados = this.estadosService.getEstados();

  constructor(
    private estadosService: EstadosService,
    private empresaService: EmpresaService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.log(this.estados);
  }

  onSubmit() {
    if (this.confirmPassword === this.empresa.password) {
      this.empresaService.postEmpresa(this.empresa).subscribe((res) => {
        console.log(res);
      });
    }
  }
  cerrar(){
    this.modalController.dismiss()
  }
}
