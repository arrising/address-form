export interface ZipCodeLookupRequest {
    "@": {
        USERID: string
    }
    Address: ZipCodeLookupAddress;
}

export interface ZipCodeLookupAddress {
    "@": {
        ID: string;
    },
    Address1: string;
    Address2?: string;
    City: string;
    State: string;
}
