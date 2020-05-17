export class CustomerDto {

     id: number;
     fullName: string;
     username: string;
     phoneNumber: string;


    constructor(fullName: string, username: string, phoneNumber: string) {
        this.fullName = fullName;
        this.username = username;
    }


}