import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserserviceService } from '../_services/userservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../_service/error.service';
import { UserDto } from '../_dto/user.model';
import { LoadingSymbolComponent } from '../../../_utility_components/loading-symbol/loading-symbol.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingSymbolComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private Service: UserserviceService, private route: ActivatedRoute, private errorHandlerService: ErrorHandlerService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatpassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.mustMatch('password', 'repeatpassword') // Add the custom validator here
    });
  }


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get repeatpassword() {
    return this.loginForm.get('repeatpassword');
  }

  mustMatch(password: string, repeatPassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(password);
      const repeatPasswordControl = control.get(repeatPassword);

      if (repeatPasswordControl?.errors && !repeatPasswordControl.errors['mustMatch']) {
        return null;
      }
      if (passwordControl?.value !== repeatPasswordControl?.value) {
        repeatPasswordControl?.setErrors({ mustMatch: true });
      } else {
        repeatPasswordControl?.setErrors(null);
      }

      return null;
    };
  }


  onSubmit() {
    this.loading = true;
    const formValues = this.loginForm.value;
    if (this.loginForm.valid) {
      const item = new UserDto(formValues.username, formValues.password);
      this.Service.RegisterUser(item).subscribe(items => {
        this.loading = false;
        this.router.navigate(['user/login']);
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
