import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'fletes',
    loadChildren: () =>
      import('./fletes/fletes.module').then((m) => m.FletesPageModule),
  },
  {
    path: 'transportes',
    loadChildren: () =>
      import('./transportes/transportes.module').then(
        (m) => m.TransportesPageModule
      ),
  },
  {
    path: 'cargadores',
    loadChildren: () =>
      import('./cargadores/cargadores.module').then(
        (m) => m.CargadoresPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
