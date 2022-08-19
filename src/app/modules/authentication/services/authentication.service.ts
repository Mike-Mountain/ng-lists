import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs";
import {SessionService} from "../../../shared";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private sessionService: SessionService) {
  }

  login(identifier: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/local`, {
      identifier,
      password
    }).pipe(
      tap(session => this.sessionService.login({user: session.user, token: session.jwt}))
    );
  }

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/local/register`, {
      username,
      email,
      password
    }).pipe(
      tap(session => this.sessionService.login({user: session.data.user, token: session.data.jwt}))
    );
  }
}
