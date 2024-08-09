import { Injectable } from '@angular/core';
import { CarsDTO } from '../_dto/car.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  public getCars(): Observable<{ ResponseData: CarsDTO[] }> {
    return this.http.get<{ ResponseData: CarsDTO[] }>("http://localhost:8484/api/cars");
  }


  public getOneCars(_id: string): Observable<{ ResponseData: CarsDTO }> {
    return this.http.get<{ ResponseData: CarsDTO }>("http://localhost:8484/api/cars/" + _id);
  }

  public CreateCars(Body: CarsDTO): Observable<Object> {
    return this.http.post("http://localhost:8484/api/cars", Body);
  }

  public UpdateCars(_id: string, Body: CarsDTO): Observable<Object> {
    return this.http.patch("http://localhost:8484/api/cars/" + _id, Body);
  }
}
