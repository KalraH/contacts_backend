
# Contacts Backend

A simple backend API for managing contacts. Built with Node.js, Express, and MongoDB.


## Badges

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Expressjs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Mongo%20DB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/?msockid=34257da746a36a5437bc6e6d47a56bf1)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://www.npmjs.com/package/jsonwebtoken) 
[![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge)](https://mongoosejs.com/)
[![bcryptjs](https://img.shields.io/badge/bcrypt%20js-004488?style=for-the-badge)](https://www.npmjs.com/package/bcryptjs)
[![dotenv](https://img.shields.io/badge/dotenv-8DD6F9?style=for-the-badge)](https://www.npmjs.com/package/dotenv)
[![nodemon](https://img.shields.io/badge/nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)](https://www.npmjs.com/package/nodemon)
[![RESTful APIs](https://img.shields.io/badge/RESTful%20API-FF6F00?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Glossary/REST)


## 🔧  Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcryptjs
- **Environment Management:** dotenv
- **Utilities:** express-async-handler, nodemon


## 🚀 Features

- User authentication using JWT
- Encrypted password storage with bcrypt
- RESTful API for CRUD operations on contacts
- Error handling with Express middlewares
- Environment-based configuration support
- Scalable folder structure


## 📂 Folder Structure

Contacts_backend/ <BR>
├<BR>
├── config/ 			# DB config and other configurations <BR>
├── constants.js 		# Status codes and reusable constants <BR>
├── controllers/ 		# Route logic for users and contacts <BR>
├── middlewares/ 		# Custom error and auth middleware <BR>
├── models/ 			# Mongoose schemas for User and Contact <BR>
├── routes/ 			# API route definitions <BR>
├── utils/ 			# Utility functions <BR>
├── .env 			# Environment variables (not committed) <BR>
├── server.js 			# App entry point <BR>
└── package.json 		# Project metadata and dependencies <BR>


## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
  git clone <your-repo-url>
  cd Contacts_backend
```

### 2. Install dependencies

```bash
  npm install
```

### 3. Run the Server

```bash
  npm run dev
```

### 4. Production Mode

```bash
  npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` 3000

`MONGO_URI` your mongodb connection string

`JWT_SECRET` your JWT secret key


## API Reference

#### Resiger a User

```js
  POST /api/users/register
```

#### Authenticate user/login

```js
  POST /api/users/login
```

#### Get Current User

```js
  GET /api/users/current
```

#### Get all contacts

```js
  GET /api/contacts
```

#### Add a new contact

```js
  POST /api/contacts
```

#### Get a contact

```js
  GET /api/contacts/:id
```

#### Update a contact

```js
  PUT /api/contacts/:id
```

#### Delete a contact

```js
  DELETE /api/contacts/:id
```

All contact routes are protected and require a valid JWT token.


## Author

HARIOM KALRA
[@KalraH](https://github.com/KalraH/)
