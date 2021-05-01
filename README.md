# CAR PARKING LOTS

## About

The API endpoint accept car plate number to be parked in the parking lot and use json file to keep record of the car in the packing slot.
The API is limited to a number slots and also a given number of request(s) at a given amount of time.

The following request is accepted:

    1. Post request that allow the endpoint to park a car given in the request body the *car number* and return the *Slot number* and the *Car number*
    2. Get request that allow the endpoint to get a particular car in the parking lot given the *Slot number* or the *Car number* in the request parameter and return the *Slot number* and the *Car number*
    3.  Delete request that allow the endpoint to unpark a car in the parking lot given the car *Slot number* and free the slot number to be use by another car

## How to use

### Run this install dependency

```
npm install
```

### Run this to start server

```
yarn dev
```

## Endpoint URL

### Post request

Park a new car

> http://localhost:3000/car-park

```
Request body accept json object of car number as shown below:
{
    plateNumber: string
}
```

### Get request

Get a parked car

> http://localhost:3000/car-park/:slotNumberOrPlateNumber

### Delete request

Unpark a car

> http://localhost:3000/car-park/:slotNumber
