export class CustomerAddDto {

    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;


    constructor(firstName: string, lastName: string, password: string, phoneNumber: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}