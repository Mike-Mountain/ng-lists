import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./core/components/layout/layout.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {path: 'dash', component: LayoutComponent, canActivate: [AuthGuard], children: []},
  {path: 'authentication', loadChildren: () => import('./modules/authentication').then(m => m.AuthenticationModule)},
  {path: '', pathMatch: 'full', redirectTo: '/dash'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
