import { Component } from '@angular/core';
import { ErrorHandlerService } from '../../_service/error.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'error-handler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-handler.component.html'
})
export class ErrorHandlerComponent {
  errorMessage: string | null = null;

  constructor(private errorHandlerService: ErrorHandlerService) {
    this.errorHandlerService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
    });
  }

  closeError() {
    this.errorHandlerService.clearError();
  }
}
