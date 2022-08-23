import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { switchMap, tap } from 'rxjs';
import { SessionService, User } from '../../../shared';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

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
          const queryString = this.createUserQueryString();
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
        switchMap((authResponse: any) =>
          this.http.get<any>(
            `${environment.apiUrl}/users/${authResponse.user.id}?populate=*`
          )
        ),
        tap((user) => {
          this.sessionService.login(user);
        })
      );
  }

  createUserQueryString() {
    let queryString = '';
    queryString += '[listsCreated][populate][editors][fields][0]=id';
    queryString +=
      '&populate[listsCreated][populate][editors][fields][1]=username';
    queryString += '&populate[listsEditor][populate][editors][fields][0]=id';
    queryString +=
      '&populate[listsEditor][populate][editors][fields][1]=username';
    queryString += '&populate[listsCreated][populate][listItems]=*';
    queryString += '&populate[listsEditor][populate][listItems]=*';
    queryString += '&populate[groupsEditor][populate][members][fields][0]=id';
    queryString +=
      '&populate[groupsCreated][populate][members][fields][1]=username';
    queryString += '&populate[groupsCreated][populate][user][fields][0]=id';
    queryString +=
      '&populate[groupsCreated][populate][user][fields][1]=username';
    queryString += '&populate[groupsMembers][populate][members][fields][0]=id';
    queryString +=
      '&populate[groupsMembers][populate][members][fields][1]=username';
    queryString += '&populate[groupsMembers][populate][user][fields][0]=id';
    queryString +=
      '&populate[groupsMembers][populate][user][fields][1]=username';
    return queryString;
  }
}
