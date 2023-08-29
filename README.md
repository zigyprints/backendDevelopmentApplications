
# backendDevelopmentApplications

Backend and RESTs Api for managing Contact in using MongoDB Database.


## Features
- Get All Contact using 
- Get Contact using Contact.id
- Add Contact using Name, Email and Phone
- Delete Contact using Contact.id
- Update Contact using Contact.id
- Cross platform


## Run Locally

Clone the project

```bash
  git clone https://github.com/zigyprints/backendDevelopmentApplications.git
```

Go to the project directory

```bash
  cd backendDevelopmentApplications
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

#### Get all contact

```http
  GET /api/contact
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get contact by id

```http
  GET /api/contact/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Create New contact

```http
  POST /api/contact
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |


####  Update contact

```http
  PUT /api/contact/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of contact to Update |

####  Delete contact

```http
  DELETE /api/contact/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of contact to Delete |


## Postman Documentation of API


(https://documenter.getpostman.com/view/29405184/2s9Y5ZwNM7)
