import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarsService } from '../_services/car.service';
import { CarsDTO } from '../_dto/car.model';
import { delay, Observable, of, switchMap, tap } from 'rxjs';
import { LoadingSymbolComponent } from '../../../_utility_components/loading-symbol/loading-symbol.component';
import { TokenaccountService } from '../../user/_services/tokenaccount.service';




@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSymbolComponent, CommonModule],
  templateUrl: './viewcars.component.html'
})
export class viewcarComponent implements OnInit {

  constructor(private Service: CarsService, private router: Router, public authService: TokenaccountService) { }
  loading: boolean = true;

  list: CarsDTO[] | undefined;

  ngOnInit(): void {
    this.getCarsData();
  }


  getCarsData(): void {
    this.loading = true;
    try {
      this.Service.getCars().subscribe(items => {
        this.list = items.ResponseData;
        this.loading = false;
      });
    }
    catch (err) {
      const error = err as Error
      throw new Error("Error: " + error.toString());
    }
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKWarUwUnMLDsnJOOPv0V659IQ1BHf1Us2yA&s';
  }

  removeitem(id: string) {
    this.loading = true;
    this.Service.DeleteCars(id).subscribe(resp => {
      if (!resp.hasOwnProperty('error')) {

        this.getCarsData();
        this.loading = false;
      }
      else {
        this.loading = false;
        this.router.navigate(['/error']);
      }
    });



  }


}
