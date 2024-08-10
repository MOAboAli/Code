import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingSymbolComponent } from '../../../_utility_components/loading-symbol/loading-symbol.component';
import { CarsDTO } from '../_dto/car.model';
import { CarsService } from '../_services/car.service';
import { ErrorHandlerService } from '../../../_service/error.service';

@Component({
  selector: 'app-veiw-single-car',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSymbolComponent],
  templateUrl: './veiw-single-car.component.html'
})
export class VeiwSingleCarComponent implements OnInit {
  loading: boolean = true;
  itementity: CarsDTO | undefined;
  _id: string = "";
  constructor(private Service: CarsService, private route: ActivatedRoute, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params["id"];
    this.loading = true;

    this.Service.getOneCars(this._id).subscribe(items => {
      this.itementity = items.ResponseData;
      this.loading = false;
    }, error => {
      this.errorHandlerService.showError('An error occurred: ' + error.error.ResponseData);
      this.loading = false;
    });
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKWarUwUnMLDsnJOOPv0V659IQ1BHf1Us2yA&s';
  }
}
