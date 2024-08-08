import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarsService } from '../_services/car.service';
import { CarsDTO } from '../_dto/car.model';
import { delay, Observable, of, switchMap, tap } from 'rxjs';




@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './viewcars.component.html'
})
export class viewcarComponent implements OnInit {

  constructor(private Service: CarsService) { }
  loading: boolean = true;

  list: CarsDTO[] | undefined;

  ngOnInit(): void {

    this.loading = true;
    try {
      this.Service.getGames().subscribe(items => {
        this.list = items.ResponseData;
        this.loading = false;
      });
    }
    catch (err) {
      const error = err as Error
      throw new Error("Error: " + error.toString());
    }
  }
}
