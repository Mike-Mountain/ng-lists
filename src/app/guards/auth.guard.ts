import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionQuery, SessionService} from "../shared/data-access/session";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(sessionQuery: SessionQuery,
              sessionService: SessionService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
