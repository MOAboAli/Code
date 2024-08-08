import { Injectable } from '@angular/core';
import { CarsDTO } from '../_dto/car.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  public getGames(): Observable<{ ResponseData: CarsDTO[] }> {
    return this.http.get<{ ResponseData: CarsDTO[] }>("http://localhost:8484/api/cars");
  }


  public getOneGames(_id: string): Observable<CarsDTO> {
    return this.http.get<CarsDTO>("http://localhost:8484/api/cars/" + _id);
  }

  public CreateGames(Body: CarsDTO): Observable<Object> {
    return this.http.post("http://localhost:8484/api/cars", Body);
  }

  public UpdateGames(_id: string, Body: CarsDTO): Observable<Object> {
    return this.http.patch("http://localhost:8484/api/cars/" + _id, Body);
  }
}
