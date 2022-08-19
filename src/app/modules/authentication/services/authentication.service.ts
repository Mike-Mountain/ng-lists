import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {switchMap, tap} from "rxjs";
import {SessionService} from "../../../shared";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private sessionService: SessionService) {
  }

  login(identifier: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/local?populate=*`, {
      identifier,
      password
    }).pipe(
      tap(session => this.sessionService.saveToken(session.token)),
      switchMap((authResponse: any) => this.http.get<any>(`${environment.apiUrl}/users/${authResponse.user.id}?populate=*`)),
      tap(session => this.sessionService.login(session.user))
    );
  }

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/local/register?populate=*`, {
      username,
      email,
      password
    }).pipe(
      tap(session => this.sessionService.saveToken(session.token)),
      switchMap((authResponse: any) => this.http.get<any>(`${environment.apiUrl}/users/${authResponse.user.id}?populate=*`)),
      tap(session => this.sessionService.login(session.user))
    );
  }
}
