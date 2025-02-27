import { signal } from "@preact/signals-react";

export const userListing = signal([
    {
      "username": "shubham.mohite1@wovvtech.com",
      "email": "shubham.mohite1@wovvtech.com",
      "name": "Shubham Mohite",
      "emp_code": "TCPL496",
      "guid": "ece97af973994f6989e8bfff4b9b0d5c",
      "status": "ACTIVE"
    },
    {
      "username": "krishnakant.vaghasiya@wovvtech",
      "email": "krishnakant.vaghasiya@wovvtech.com",
      "name": "Krishnakant Vaghasiya",
      "emp_code": "TCPL463",
      "guid": "7671e8db29ab48c48b631b8751093359",
      "status": "ACTIVE"
    },
  ]);


  export const userLastFileStore = signal({
    "TCPL496":"2025-01-30_14-15_TCPL496.enc",
    "TCPL463":"2025-02-20_10-11_TCPL463.enc",
  })
