import { EditionDTO } from './edition.model';


export class CarsDTO {
    _id?: string;
    Make?: string;
    Model?: string;
    Year?: number;
    Editions?: EditionDTO[];

    // constructor(make: string, model: string, year: number, editions?: EditionDTO[]) {
    //     this.Make = make;
    //     this.Model = model;
    //     this.Year = year;
    //     this.Editions = editions;
    // }
}