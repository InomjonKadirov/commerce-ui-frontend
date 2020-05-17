export class AddressDto {

     id?: number;
     region?: string;
     city?: string;
     district?: string;
     mahalla?: string;
     homeNumber?: string;
     street?:string;
     flatNumber?: string;
     customer?: string;
     main?: boolean;
     state?: boolean;


    constructor( region: string, city: string, district: string, mahalla: string, homeNumber: string, street:string,
                 flatNumber: string, customer: string, main: boolean) {
        this.region = region;
        this.city = city;
        this.district = district;
        this.mahalla = mahalla;
        this.homeNumber = homeNumber;
        this.street = street;
        this.flatNumber = flatNumber;
        this.customer = customer;
        this.main = main;

    }
}