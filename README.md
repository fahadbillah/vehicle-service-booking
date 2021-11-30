# Volvo Assignment

# Getting started

Pre-requisite
  - node v14.x.x

Steps to run the project
```console
$ git clone -b volvo https://github.com/fahadbillah/base-gql-express volvo-fahad && cd volvo-fahad
$ yarn install
$ yarn build
$ yarn start
```

Open [GraphQL Playground](http://localhost:4000/graphql) in your browser.

Documentation, operations can be found in the DOCS panel in playground.



## Booking Operations
```graphql
mutation updateCapacity{
  updateCapacity(capacity:3)
}

mutation createBookingOneDateOne(
  $vehicleOne: VehicleInput!
  $customer: CustomerInput!
  $dateOne: String!
) {
  createBooking(
    input: {
      customer: $customer
      vehicle: $vehicleOne
      booking: { date: $dateOne, time: 9 }
    }
  ) {
    id
    dateTime
    vehicle {
      make
      model
      vin
    }
    customer {
      name
      email
      phone
    }
  }
}
mutation createBookingTwoDateOne(
  $vehicleTwo: VehicleInput!
  $customer: CustomerInput!
  $dateOne: String!
) {
  createBooking(
    input: {
      customer: $customer
      vehicle: $vehicleTwo
      booking: { date: $dateOne, time: 11 }
    }
  ) {
    id
    dateTime
  }
}
mutation createBookingOneDateTwo(
  $vehicleOne: VehicleInput!
  $customer: CustomerInput!
  $dateTwo: String!
) {
  createBooking(
    input: {
      customer: $customer
      vehicle: $vehicleOne
      booking: { date: $dateTwo, time: 9 }
    }
  ) {
    id
    dateTime
  }
}
mutation createBookingTwoDateTwo(
  $vehicleTwo: VehicleInput!
  $customer: CustomerInput!
  $dateTwo: String!
) {
  createBooking(
    input: {
      customer: $customer
      vehicle: $vehicleTwo
      booking: { date: $dateTwo, time: 11 }
    }
  ) {
    id
    dateTime
  }
}
query getBookingByDateOne($dateOne: String!) {
  getBookingByDate(date: $dateOne) {
    id
    dateTime
    vehicle {
      make
      model
      vin
    }
    customer {
      name
      email
      phone
    }
  }
}
query getBookingByDateTwo($dateTwo: String!) {
  getBookingByDate(date: $dateTwo) {
    id
    dateTime
    vehicle {
      make
      model
      vin
    }
    customer {
      name
      email
      phone
    }
  }
}
query getBookingByVinOne($vinOne: Vin!) {
  getBookingByVin(vin: $vinOne) {
    id
    dateTime
    vehicle {
      make
      model
      vin
    }
    customer {
      name
      email
      phone
    }
  }
}
query getBookingByVinTwo($vinTwo: Vin!) {
  getBookingByVin(vin: $vinTwo) {
    id
    dateTime
    vehicle {
      make
      model
      vin
    }
    customer {
      name
      email
      phone
    }
  }
}
```

## Query Variables
```JSON
{
  "customer": {
    "name":"billah",
    "email":"billah@gmail.com",
    "phone":"01111111111"
  },
  "vehicleOne": {
    "make":"volvo",
    "model":"s90",
    "vin":"4S3BMJDJDJDJ28605"
  },
  "vehicleTwo": {
    "make":"volvo",
    "model":"s90",
    "vin":"6SUBMJDJDJDJ28605"
  },
  "dateOne":"2021-12-01",
  "dateTwo":"2021-11-29",
  "vinOne": "4S3BMJDJDJDJ28605",
  "vinTwo": "6SUBMJDJDJDJ28605"
}
```
