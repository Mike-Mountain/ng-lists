import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {switchMap, tap} from 'rxjs';
import {SessionService, User, createUserQueryString} from '../../../shared';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) {
  }

  login(identifier: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/local`, {
        identifier,
        password,
      })
      .pipe(
        tap((session) => {
          this.sessionService.saveToken(session.jwt);
        }),
        switchMap((authResponse: any) => {
          const queryString = createUserQueryString();
          return this.http.get<any>(
            `${environment.apiUrl}/users/${authResponse.user.id}?populate${queryString}`
          );
        }),
        tap((user) => this.sessionService.login(new User(user)))
      );
  }

  register(username: string, email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/local/register`, {
        username,
        email,
        password,
      })
      .pipe(
        tap((session) => this.sessionService.saveToken(session.token)),
        switchMap((authResponse: any) => {
            const queryString = createUserQueryString();
            return this.http.get<any>(
              `${environment.apiUrl}/users/${authResponse.user.id}?populate=${queryString}`
            )
          }
        ),
        tap((user) => {
          this.sessionService.login(user);
        })
      );
  }
}
