import { environment } from '../../../../environments/environment';
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
    return this.http.get<{ ResponseData: CarsDTO[] }>(environment.BackEndapiUrl + "cars");
  }


  public getOneCars(_id: string): Observable<{ ResponseData: CarsDTO }> {
    return this.http.get<{ ResponseData: CarsDTO }>(environment.BackEndapiUrl + "cars/" + _id);
  }

  public CreateCars(Body: CarsDTO): Observable<Object> {
    return this.http.post(environment.BackEndapiUrl + "cars", Body);
  }

  public UpdateCars(_id: string, Body: CarsDTO): Observable<Object> {
    return this.http.patch(environment.BackEndapiUrl + "cars/" + _id, Body);
  }

  public DeleteCars(_id: string): Observable<Object> {
    return this.http.delete(environment.BackEndapiUrl + "cars/" + _id);
  }

  public DeleteEdition(_id: string, Editionindex: string): Observable<Object> {
    return this.http.delete(environment.BackEndapiUrl + "car/" + _id + "/Editions/" + Editionindex);
  }
}
