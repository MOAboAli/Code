import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../_services/userservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../_service/error.service';
import { UserDto } from '../_dto/user.model';
import { LoadingSymbolComponent } from '../../../_utility_components/loading-symbol/loading-symbol.component';
import { TokenaccountService } from '../_services/tokenaccount.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingSymbolComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _router: Router, private Service: UserserviceService, private route: ActivatedRoute, private errorHandlerService: ErrorHandlerService, private authService: TokenaccountService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // username with validation
      password: ['', [Validators.required]] // Password with validation , Validators.minLength(6)
    });
  }

  // Getters for easy access to form fields in the template
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Function to handle form submission
  onSubmit() {
    this.loading = true;
    const formValues = this.loginForm.value;
    if (this.loginForm.valid) {
      const item = new UserDto(formValues.username, formValues.password);
      this.Service.Authenticate(item).subscribe(items => {
        console.log(items.ResponseData);
        this.authService.saveToken(items.ResponseData)
        this.loading = false;
        this._router.navigate(["home"]);
      }, error => {
        this.errorHandlerService.showError('An error occurred: ' + error.error.ResponseData);
        this.loading = false;
      });
    } else {
      this.errorHandlerService.showError('An error occurred: This Form is not Valid ');
      this.loading = false;
    }
  }
}
