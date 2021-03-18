# RESTful API blanja-app

## About the project
Simple, easy implementation of the private web API.

## Build With Project

<table>
  <tr>
    <td valign="center"><img src="https://www.sohamkamani.com/static/65137ed3c844d05124dcfdab28263c21/express-routing-logo.png" height="200px" width="250px"></td>
    <td valign="center"><img src="https://thekenyandev.com/static/ea6d8fe57ed02c773ad10ca3003b2451/nodejs.png" height="200px" width="250px"></td>
    <td valign="center"><img src="https://bootup.ai/blog/wp-content/uploads/2019/04/Pengertian-MySQL-Kegunaan-dan-Kelebihan.png" height="200px" width="250px"></td>
  </tr>
 </table>

* [ExpressJS](https://expressjs.com/) 
* [MYSQL](https://www.mysql.com/)
* [NodeJS](https://nodejs.org/)

## Getting Started
Berikut panduan untuk menjalankan project ini secara lokal
### How to install

* Clone Repository
    ```sh
    https://github.com/Shhb0420/API-Testing
    ```
* ExpressJS
    ```sh
    npm i express
    ```
* MYSQL
    ```sh
    npm i mysql
    ```
* Morgan
    ```sh
    npm i morgan
    ```

### ENV configuration

Please create and make the changes in the .env file.

```
HOST = "YOUR_DB_HOSTNAME"
DB_USER = "YOUR_DB_USERNAME"
DB_PASSWORD = "YOUR_DB_PASSWORD"
DB = "YOUR_DB_NAME"

PORT = "YOUR_PORT"

SECRET_KEY = "YOUR_SECRET_KEY"

```

## Endpoint

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /auth/register | Register New User |
| POST | /auth/login | Login User |
| PATCH | /user/:id | Update User Account |
| GET | /user/findUser | Searching Name User |
| POST | /user/referrer | Input Refferal Code |

## REST API

* [Documentation](https://documenter.getpostman.com/view/13520286/Tz5tZbVd)