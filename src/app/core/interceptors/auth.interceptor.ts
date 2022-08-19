import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, switchMap, take} from 'rxjs';
import {SessionQuery} from "../../shared";
import {map} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionQuery: SessionQuery) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.sessionQuery.select(session => session.token).pipe(
      take(1),
      switchMap(token => {
        if (token) {
          const req = request.clone({
            setHeaders: {
              'Authorization': `Bearer ${token}`
            }
          });
          return next.handle(req);
        } else {
          return next.handle(request)
        }
      })
    )
  }
}
