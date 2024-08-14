import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../../../_service/error.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenaccountService {
  private tokenKey: string = 'authTokenCarCollection';
  private jwtHelper = new JwtHelperService();

  constructor(private router: Router, private errorHandlerService: ErrorHandlerService) { }

  saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    //console.log(this.tokenKey);
    return sessionStorage.getItem(this.tokenKey);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token)
      return false;

    const validtoken = token ? !this.jwtHelper.isTokenExpired(token) : false;

    if (!validtoken)
      this.errorHandlerService.showError(environment.ErrorMessageSession);

    return validtoken
  }

  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.router.navigate(['/user/login']);
  }
}
