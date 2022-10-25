import { Component, OnInit } from '@angular/core';
import { ChildActivationStart, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/fletes/services/login.service';
import { SessionService } from 'src/app/services/session.service';

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
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  
  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (res) => {
        if (res.session.tipo !== 'cargador' ) {
          return
        }
        const promesas: Promise<any>[] = [
          this.sessionService.set('tipo', res.session.tipo),
        ];
        promesas.push(this.sessionService.set('empresa', res.session.empresa));
        promesas.push(this.sessionService.set('rfc', res.session.email));
        Promise.all(promesas).then((val) => {
          console.log(val)
        });
      },
      (err) => console.log(err)
    );
  }
  cerrar(){
    this.modalController.dismiss();
  }
}