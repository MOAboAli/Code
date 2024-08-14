import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenaccountService } from '../../components/user/_services/tokenaccount.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title = "New Application  ";

  constructor(private _router: Router, public authService: TokenaccountService) {

  }

  homebutton() {
    console.log("home");
    this._router.navigate(["home"]);

  }

  gamebutton() {
    console.log("game");
    this._router.navigate(["games"]);
  }

  Logout() {
    this.authService.clearToken();

  }
}
