export class BannerDto {

    id: number;
    name: string;
    type: string;
    pathUZ: string;
    pathRU: string;
    images: File[];
    state: boolean;


    constructor( name: string, type: string, pathUZ: string, pathRU: string, state: boolean) {
        this.name = name;
        this.type = type;
        this.pathUZ = pathUZ;
        this.pathRU = pathRU;
        this.state = state;
    }
}