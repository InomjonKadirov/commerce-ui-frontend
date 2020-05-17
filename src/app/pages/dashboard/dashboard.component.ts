import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomerDto} from "../../shared/model/customer.dto";
import {CustomerService} from "../../shared/services/customer.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressDto} from "../../shared/model/address.dto";
import {AddressService} from "../../shared/services/address.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'appBootstrap';

  closeResult: string;

  currentCustomer: CustomerDto;
  newAddress: AddressDto;

  addressList: AddressDto[] = [];
  mainAddress: AddressDto;

  updateCustomerForm: FormGroup;
  submitted = false;

  newAddressForm: FormGroup;
  submitted1 = false;

  editAddressForm: FormGroup;
  submitted2 = false;
  editAddress: AddressDto;

  constructor(private modalService: NgbModal,
              private customerService: CustomerService,
              private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private addressService: AddressService) {


    // initialize address edit form
    this.editAddressForm = this.formBuilder.group({
      region: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      mahalla: ['', Validators.required],
      street: ['', Validators.required],
      homeNumber: ['', Validators.required],
      flatNumber: ['', Validators.required],
      main: ['', Validators.required]
    });

  }

  open(content) {
    this.modalService.open(content,   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openById(content, id) {

    // Get Address By id
    this.editAddress  = this.addressList.find( item => item.id === id);
    console.log(`Current Address: ${JSON.stringify(this.editAddress)}`);

    // update address edit form
    this.editAddressForm.setValue({
      region: this.editAddress.region,
      city: this.editAddress.city,
      district: this.editAddress.district,
      mahalla: this.editAddress.mahalla,
      street: this.editAddress.street,
      homeNumber: this.editAddress.homeNumber,
      flatNumber: this.editAddress.flatNumber,
      main: this.editAddress.main
    });


    this.modalService.open(content,   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit(): void {


    // get current customer info
    this.customerService.getCurrentLoggedInCustomerInfo().subscribe(
        customerInfo => {

          this.currentCustomer = customerInfo;

          // initialize update customer form
          // later may be I should add phone number verification through firebase
          this.updateCustomerForm = this.formBuilder.group({
            fullName: [this.currentCustomer.fullName, Validators.required],
            username: [this.currentCustomer.username, Validators.required]
          });
          alert(this.currentCustomer.username);
          // get all addresses
          this.addressService.getAddressList(this.currentCustomer.username).subscribe(
              data => {
                this.addressList = data;
                console.log(JSON.stringify(data));
              },error => {
                console.log(JSON.stringify(error));
              }
          );

          console.log(JSON.stringify(customerInfo));
        }
    );






    // initialize address add form
    this.newAddressForm = this.formBuilder.group({
      region: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      mahalla: ['', Validators.required],
      street: ['', Validators.required],
      homeNumber: ['', Validators.required],
      flatNumber: ['', Validators.required],
      main: ['', Validators.required]
    });


  }

  // convenience getter for easy access to form fields
  get f() { return this.updateCustomerForm.controls; }

  // convenience getter for easy access to form fields
  get address() { return this.updateCustomerForm.controls; }

  onSubmitUpdateCustomer() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateCustomerForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.updateCustomerForm.value, null, 4));
  }

  // onReset() {
  //   this.submitted = false;
  //   this.updateCustomerForm.reset();
  // }



  logOut() {
    this.authService.logout();
    this.router.navigate(['home/one']);
  }


  onSubmitNewAddress(): void {
    this.submitted1 = true;



    // stop here if form is invalid
    if (this.newAddressForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.newAddressForm.value));

    this.newAddress = new AddressDto(
        this.newAddressForm.controls['region'].value,
        this.newAddressForm.controls['city'].value,
        this.newAddressForm.controls['district'].value,
        this.newAddressForm.controls['mahalla'].value,
        this.newAddressForm.controls['homeNumber'].value,
        this.newAddressForm.controls['street'].value,
        this.newAddressForm.controls['flatNumber'].value,
        this.currentCustomer.username,
        this.newAddressForm.controls['main'].value
    );

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.newAddressForm.value, null, 4));

    // sending to the server input data
    this.addressService.addAddress(this.newAddress).subscribe(
        value => {
          console.log(JSON.stringify(value));
        },error => {
          console.log(JSON.stringify(error));
        }
    );

  }

  onReset() {
    this.submitted1 = false;
    this.updateCustomerForm.reset();
  }


  onSubmitEditAddress(): void {

  }

}