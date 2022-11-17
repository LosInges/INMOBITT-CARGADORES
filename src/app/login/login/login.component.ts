import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/fletes/services/login.service';
import { SessionService } from 'src/app/services/session.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private loginService: LoginService,
    private sessionService: SessionService,
    private router: Router,
    private modalController: ModalController,
    private alertCtrl: AlertController,
  ) { }

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  ngOnInit() { }

  login() {
    if (
      this.email.trim().length <= 0 ||
      this.password.trim().length <= 0
    ) {
      this.mostrarAlerta("Error", "Campos vacios", "No deje espacios en blanco.");
    } else {
      this.loginService.login(this.email, this.password).subscribe(
        (res) => {
          if (res.session.tipo !== 'cargador') {
            console.log('NO es cargador');
            this.mostrarAlerta("Error:", "Correo inválido", "Recuerde bien su correo y contraseña");
          } else {
            const promesas: Promise<any>[] = [
              this.sessionService.set('tipo', res.session.tipo),
            ];
            promesas.push(this.sessionService.set('empresa', res.session.empresa));
            promesas.push(this.sessionService.set('rfc', res.session.email));
            
            Promise.all(promesas).then((val) => {
              console.log(val);
              this.router.navigate(['/', 'fletes']);
              this.modalController.dismiss();
            });
          }
        },
        (err) => console.log(err)
      );
    }
  }
  
  cerrar() {
    this.modalController.dismiss();
  }
}
