<p align="center">
  <img alt="compass logo" src="https://user-images.githubusercontent.com/65569815/176964539-fe858838-0d07-418e-9220-b6d94461ecee.png" />
</p>

# Compass Tutor MicroService

Challenge of the **NodeJS Scholl Program from [Compass.uol](https://compass.uol/)**.

## Summary

- ### [How to initialize](#-como-inicializar)
- ### [Endpoints](#-endpoints)
- ### [Schemas](#-schemas)

## Description

A client hired Compass to build a new microservice for its veterinary franchise. This microservice will be used by all the clinics they own for internal client and attendances management.

So, you have this new mission, to build the POC foundations of this brand new microservice, so the sales and management team can have the primary technical view of the needs that the client has.

## Tecnologias

<p>
  <img src="https://user-images.githubusercontent.com/65569815/182266557-f2d0c589-fe31-4d65-b867-cb40385066a0.svg" width="100">
  <img src="https://user-images.githubusercontent.com/65569815/182253645-6966537e-18ed-4c47-974b-22510cc3d834.png" width="100">
</p>

## Requirements

Before starting, you will need to have Node.js installed on your machine. Additionally, make sure you have a MongoDB Atlas collection set up, and don't forget to create a .env file based on the .env.example file.

## How to initialize

As described in the requirements above, first you need to install the [NodeJS](https://nodejs.org/en/)
<br/>
Then you will run the following commands:

```bash
# Clone this repository
$ git clone https://github.com/AntonioRdC/PBnodeChallenge2
# Access the project folder
$ cd PBnodeChallenge2
# Install the dependencies
$ npm install
```

Create a .env file based on the .env.example file.

```bash
# Start the application at localhost:5000
$ npm run dev
```

## Endpoints

### Swagger Documentation Endpoint

| Route       | Method | Description                  |
| ----------- | :----: | ---------------------------- |
| `/api-docs` |  GET   | Get Documentation in Swagger |

### Tutor Endpoints

| Route             | Method | Description          |
| ----------------- | :----: | -------------------- |
| `/tutors`         |  GET   | Retrieves all tutors |
| `/tutor`          |  POST  | Create a new tutor   |
| `/tutor/:tutorId` |  PUT   | Updates a tutor      |
| `/tutor/:tutorId` | DELETE | Deletes a tutor      |

### Pet Endpoints

| Route                        | Method | Description                          |
| ---------------------------- | :----: | ------------------------------------ |
| `/pet/:tutorId`              |  POST  | Creates a pet and adds it to a tutor |
| `/pet/:petId/tutor/:tutorId` |  PUT   | updates a pet's info                 |
| `/pet/:petId/tutor/:tutorId` | DELETE | deletes a pet from a tutor           |

## Schema

### Tutor Table

| FieldName       |    Type    | Required | Unique |
| --------------- | :--------: | :------: | :----: |
| `_id`           |  ObjectId  |  false   |  true  |
| `password`      |   String   |   true   | false  |
| `name`          |   String   |   true   | false  |
| `phone`         |   String   |   true   |  true  |
| `email`         |   String   |   true   |  true  |
| `date_of_birth` |   String   |   true   | false  |
| `zip_code`      |   Number   |   true   | false  |
| `pets`          | ObjectId[] |  false   |  true  |

```bash
# Example Tutor .json
{
    id: "64a32d48df2eadrf95fee709",
    name: "Jonas",
    phone: "85989323895",
    email: "jonas@paidepet.com",
    date_of_birth: "1993-12-12 10:10",
    zip_code: "61760000"
}
```

### Pet Table

| FieldName       |   Type   | Required | Unique |
| --------------- | :------: | :------: | :----: |
| `_id`           | ObjectId |  false   |  true  |
| `name`          |  String  |   true   | false  |
| `species`       |  String  |   true   | false  |
| `carry`         |  String  |   true   | false  |
| `weight`        |  Number  |   true   | false  |
| `date_of_birth` |  String  |   true   | false  |

```bash
# Example Pet .json
{
    id: "64a32d48df2eaccf95fee709",
    name: "Lilo",
    species: "dog",
    carry: "p",
    weight: 5,
    date_of_birth: "1993-12-12 10:10"
}
```

## Author
<p>
* <img src="https://avatars.githubusercontent.com/AntonioRdC" width=50><br>
  [Antonio Carvalho](https://github.com/AntonioRdC)

* <img src="https://avatars.githubusercontent.com/Guilgb" width=50><br>
  [Guilherme Bezerra](https://github.com/Guilgb)

* <img src="https://avatars.githubusercontent.com/Franc1scaGeovanna" width=50><br>
  [Franc1scaGeovanna](https://github.com/Franc1scaGeovanna)

* <img src="https://avatars.githubusercontent.com/tomazvinicius" width=50><br>
  [Vinicius Tomaz](https://github.com/tomazvinicius)
</p>
