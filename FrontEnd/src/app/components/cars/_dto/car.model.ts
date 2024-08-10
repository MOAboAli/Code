import { EditionDTO } from './edition.model';


export class CarsDTO {
    _id?: string;
    Make?: string;
    Model?: string;
    Year?: number;
    Editions?: EditionDTO[];
    imageUrl?: string;

    constructor(make: string, model: string, year: number, editions?: EditionDTO[], imageUrl?: string) {
        this.Make = make;
        this.Model = model;
        this.Year = year;
        this.Editions = editions;
        this.imageUrl = imageUrl;

    }
}