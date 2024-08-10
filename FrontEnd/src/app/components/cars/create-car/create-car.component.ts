import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingSymbolComponent } from '../../../_utility_components/loading-symbol/loading-symbol.component';
import { CarsService } from '../_services/car.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { EditionDTO } from '../_dto/edition.model';
import { CarsDTO } from '../_dto/car.model';

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

  constructor(private fb: FormBuilder, private router: Router, private Service: CarsService) {
    this.PageForm = this.fb.group({
      Make: ['', Validators.required],
      Model: [null, [Validators.required]],
      Year: [null, [Validators.min(1900), Validators.max(new Date().getFullYear())]],
      imageUrl: [null, [Validators.min(0)]],

      Editions: this.fb.array(new Array<EditionDTO>)
    });
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
    if (this.PageForm.valid) {
      const item = new CarsDTO(
        formValues.Make,
        formValues.Model,
        formValues.Year,
        formValues.Editions,
        formValues.imageUrl
      );

      this.Service.CreateCars(item).subscribe(resp => {

        console.log(resp);
        if (!resp.hasOwnProperty('error')) {
          this.router.navigate(['/cars']);
        }
      });

    }
  }
}
