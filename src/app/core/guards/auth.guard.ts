import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionQuery, SessionService} from "../../shared/data-access/session";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionQuery: SessionQuery,
              private sessionService: SessionService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.sessionQuery.isLoggedIn()) {
      this.router.navigate(['/authentication/login']);
      return false;
    } else {
      return true;
    }
  }

}
