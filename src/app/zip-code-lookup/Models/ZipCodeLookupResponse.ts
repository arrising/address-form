export interface ZipCodeLookupResponse {
    Address: Array<ZipCodeLookupResponseAddress>;
}

export interface ZipCodeLookupResponseAddress {
    "@": {
        ID: string;
    },
    Address1: Array<string>;
    Address2: Array<string>;
    City: Array<string>;
    State: Array<string>;
    Zip5: Array<string>;
    Zip4: Array<string>;
}
