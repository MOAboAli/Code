export class EditionDTO {
    Name?: string;
    Features?: string;
    Description?: string;

    constructor(name?: string, features?: string, description?: string) {
        this.Name = name;
        this.Features = features;
        this.Description = description;
    }
}