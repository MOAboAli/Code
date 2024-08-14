import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingSymbolComponent } from '../../../_utility_components/loading-symbol/loading-symbol.component';
import { CarsDTO } from '../_dto/car.model';
import { CarsService } from '../_services/car.service';
import { ErrorHandlerService } from '../../../_service/error.service';
import { TokenaccountService } from '../../user/_services/tokenaccount.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-veiw-single-car',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSymbolComponent, CommonModule],
  templateUrl: './veiw-single-car.component.html'
})
export class VeiwSingleCarComponent implements OnInit {
  loading: boolean = true;
  itementity: CarsDTO | undefined;
  _id: string = "";
  constructor(private Service: CarsService, private route: ActivatedRoute, private errorHandlerService: ErrorHandlerService, public authService: TokenaccountService) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params["id"];
    this.loading = true;

    this.GetCarItem();
  }


  GetCarItem() {
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
    imgElement.src = environment.ErrorImage;
  }

  removesubitem(index: string) {
    this.loading = true;
    this.Service.DeleteEdition(this._id, index).subscribe(resp => {
      if (!resp.hasOwnProperty('error')) {
        //this.router.navigate(['/cars']);
        this.GetCarItem();

      }
      else {
        this.errorHandlerService.showError(environment.ErrorMessage);
        this.loading = false;
      }
    });

  }

}
