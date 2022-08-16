import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./core/components/layout/layout.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {DashboardContainerComponent} from "./modules/dashboard";

const routes: Routes = [
  {path: 'authentication', loadChildren: () => import('./modules/authentication').then(m => m.AuthenticationModule)},
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'dashboard', component: DashboardContainerComponent},
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
