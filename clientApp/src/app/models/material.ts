export class Material {
    id: number;
    type: string;
    name: string;
    thickness: number;
    surface: string;
    finish: string;
    price: number;
    priceVat: number;
    fullName: string;

    constructor(id: number, type: string, name: string, thickness: number,
                surface: string, finish: string, price: number, priceVat: number) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.thickness = thickness;
        this.surface = surface;
        this.finish = finish;
        this.price = price;
        this.priceVat = priceVat;
        this.fullName = type + ' ' + name + ' ' + thickness + 'cm ' + surface + ' ' + finish;
    }
}
