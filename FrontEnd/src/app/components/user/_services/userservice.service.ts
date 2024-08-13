import { Injectable } from '@angular/core';
import { UserDto } from '../_dto/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {


  constructor(private http: HttpClient) { }

  public Authenticate(Body: UserDto): Observable<{ ResponseData: string }> {
    return this.http.post<{ ResponseData: string }>("http://localhost:8484/api/user/authenticate", Body);
  }

  public RegisterUser(Body: UserDto): Observable<Object> {
    return this.http.post("http://localhost:8484/api/user/registration", Body);
  }
}
