import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingSymbolComponent } from '../../../_utility_components/loading-symbol/loading-symbol.component';
import { CarsService } from '../_services/car.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { EditionDTO } from '../_dto/edition.model';
import { CarsDTO } from '../_dto/car.model';
import { ErrorHandlerService } from '../../../_service/error.service';
import { TokenaccountService } from '../../user/_services/tokenaccount.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-car',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LoadingSymbolComponent],
  templateUrl: './create-car.component.html'
})
export class CreateCarComponent {

  loading: boolean = false;
  labeltest = 'Create a New Car';
  PageForm: FormGroup;
  _id: string = "";
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private Service: CarsService, private errorHandlerService: ErrorHandlerService, public authService: TokenaccountService) {
    this._id = this.route.snapshot.params["id"];
    this.loading = true;
    this.PageForm = this.fb.group({
      Make: ['', Validators.required],
      Model: [null, [Validators.required]],
      Year: [null, [Validators.min(1900), Validators.max(new Date().getFullYear())]],
      imageUrl: [null],
      Editions: this.fb.array(new Array<EditionDTO>)
    });

    if (this._id && this._id != "") {
      this.labeltest = 'Edit Car';
      this.Service.getOneCars(this._id).subscribe(items => {

        this.PageForm = this.fb.group({
          Make: [items.ResponseData.Make, Validators.required],
          Model: [items.ResponseData.Model, [Validators.required]],
          Year: [items.ResponseData.Year, [Validators.min(1900), Validators.max(new Date().getFullYear())]],
          imageUrl: [items.ResponseData.imageUrl],
          Editions: this.fb.array([])
        });

        const editionsFormArray = this.PageForm.get('Editions') as FormArray;
        items.ResponseData.Editions!.forEach((edition: EditionDTO) => {
          editionsFormArray.push(this.fb.group({
            Name: [edition.Name],
            Features: [edition.Features],
            Description: [edition.Description],
            imageUrl: [edition.imageUrl]
          }));
        });
        this.loading = false;


      }, error => {
        this.errorHandlerService.showError('An error occurred: ' + error.error.ResponseData);
        this.loading = false;
      });
    }
    else {
      this.loading = false;

    }
  }
  ngOnInit(): void {

  }

  get subitems(): FormArray {
    return this.PageForm.get('Editions') as FormArray;
  }

  addsubItem() {
    this.subitems.push(this.createEdition());
  }

  createEdition(): FormGroup {
    return this.fb.group({
      Name: '',
      Features: '',
      Description: '',
      imageUrl: ''
    });
  }

  removesubitem(index: number) {
    this.subitems.removeAt(index);
  }


  onSubmit() {
    const formValues = this.PageForm.value;
    if (this.PageForm.valid && this.authService.isTokenValid()) {
      const item = new CarsDTO(
        formValues.Make,
        formValues.Model,
        formValues.Year,
        formValues.Editions,
        formValues.imageUrl
      );

      if (this._id && this._id != "") {
        this.Service.UpdateCars(this._id, item).subscribe(resp => {
          if (!resp.hasOwnProperty('error')) {
            this.router.navigate(['/cars']);
          }
        });
      }
      else {
        this.Service.CreateCars(item).subscribe(resp => {
          if (!resp.hasOwnProperty('error')) {
            this.router.navigate(['/cars']);
          }
        });
      }
    } else {
      this.errorHandlerService.showError(environment.ErrorMessage + ", Either your Token Expired or the form is not valid.");
    }
  }
}
