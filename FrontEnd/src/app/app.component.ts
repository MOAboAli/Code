import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './_main_components/footer/footer.component';
import { HeaderComponent } from './_main_components/header/header.component';
import { CommonModule } from '@angular/common';
import { ErrorHandlerComponent } from './_utility_components/error-handler/error-handler.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule, ErrorHandlerComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'FrontEnd';
}
