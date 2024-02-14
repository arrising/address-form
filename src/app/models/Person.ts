import { Address } from "./Address";
import { PhoneNumber } from "./PhoneNumber";

export interface Person {
    firstName: string;
    lastName: string;
    address: Address;
    phoneNumber: PhoneNumber;
}
